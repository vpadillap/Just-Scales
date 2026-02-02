
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Load package info
const packageJson = require('../package.json');
const version = packageJson.version;
const productName = packageJson.build?.productName || packageJson.name;

const RELEASE_DIR = path.join(__dirname, '../release');
const SOURCE_DIR = path.join(RELEASE_DIR, 'win-unpacked');
const OUTPUT_ZIP = path.join(RELEASE_DIR, `${productName}-${version}-win.zip`);

console.log(`📦 Packaging Windows ZIP using 'archiver'...`);
console.log(`   Source: ${SOURCE_DIR}`);
console.log(`   Dest:   ${OUTPUT_ZIP}`);

// Validate source exists
if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Error: Source directory not found: ${SOURCE_DIR}`);
    console.error(`   Ensure 'electron-builder' ran with 'target: dir'`);
    process.exit(1);
}

// Remove valid existing zip to avoid conflict
if (fs.existsSync(OUTPUT_ZIP)) {
    try {
        fs.unlinkSync(OUTPUT_ZIP);
        console.log(`   Removed existing artifact.`);
    } catch (e) {
        console.error(`⚠️  Warning: Could not remove existing zip: ${e.message}`);
    }
}

// Create output stream
const output = fs.createWriteStream(OUTPUT_ZIP);
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

// Listen for all archive data to be written
output.on('close', function () {
    console.log(`✅ ZIP created successfully!`);
    console.log(`   Total bytes: ${archive.pointer()}`);
});

// Good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
        console.warn('⚠️  Warning:', err);
    } else {
        throw err;
    }
});

// Good practice to catch this error explicitly
archive.on('error', function (err) {
    console.error('❌ Archiver Error:', err);
    process.exit(1);
});

// Pipe archive data to the file
archive.pipe(output);

// Append files from a directory
// name=false prevents adding the root 'win-unpacked' folder to the zip path
// so the zip content starts with the files inside win-unpacked
archive.directory(SOURCE_DIR, false);

// Finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();
