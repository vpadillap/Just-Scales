const checker = require('license-checker');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '../src/assets');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'licenses.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('🔍 Scanning production dependencies via npm list...');

// 1. Get true production dependencies (recursive) using npm
// This avoids license-checker including devDependencies that happen to be in node_modules
let prodDeps = new Set();
try {
    const npmListOutput = execSync('npm list --prod --json --all', {
        cwd: path.join(__dirname, '..'),
        maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    });
    const npmList = JSON.parse(npmListOutput.toString());

    // Recursive function to harvest package names
    function collectDeps(deps) {
        if (!deps) return;
        Object.keys(deps).forEach(key => {
            prodDeps.add(key); // Dependencies object keys are package names
            if (deps[key].dependencies) {
                collectDeps(deps[key].dependencies);
            }
        });
    }

    if (npmList.dependencies) {
        collectDeps(npmList.dependencies);
    }
    console.log(`✅ Identified ${prodDeps.size} production dependencies.`);

} catch (e) {
    console.error('❌ Error running npm list:', e.message);
    process.exit(1);
}

// 2. Run license-checker
console.log('🔍 Extracting license details...');
checker.init({
    start: path.join(__dirname, '..'),
    production: true, // Still use this optimization
    excludePrivatePackages: true,
}, (err, packages) => {
    if (err) {
        console.error('❌ Error scanning licenses:', err);
        process.exit(1);
    }

    // 3. Filter and Transform
    const licenseList = Object.keys(packages)
        .filter(pkgKey => {
            // pkgKey is "name@version" usually, or just "name" (path)
            // license-checker usually returns "name@version"
            const atIndex = pkgKey.lastIndexOf('@');
            const name = atIndex > -1 ? pkgKey.substring(0, atIndex) : pkgKey;

            // STRICT FILTER: Only include if valid prod dep AND not a type definition
            if (name.startsWith('@types/')) return false;
            return prodDeps.has(name);
        })
        .map(pkgKey => {
            const info = packages[pkgKey];
            const atIndex = pkgKey.lastIndexOf('@');
            const name = atIndex > -1 ? pkgKey.substring(0, atIndex) : pkgKey;
            const version = atIndex > -1 ? pkgKey.substring(atIndex + 1) : '';

            return {
                name: name,
                version: version,
                license: info.licenses,
                author: info.author || info.publisher || 'Unknown',
                repository: info.repository || '',
                // licenseText: info.licenseFile ? 'See repository' : 'Unknown', 
            };
        });

    try {
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(licenseList, null, 2));
        console.log(`✅ Licenses generated successfully at: ${OUTPUT_FILE}`);
        console.log(`📊 Total included: ${licenseList.length} (Filtered from ${Object.keys(packages).length} raw results)`);
    } catch (writeErr) {
        console.error('❌ Error writing license file:', writeErr);
        process.exit(1);
    }
});
