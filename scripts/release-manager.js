import inquirer from 'inquirer';
import { execa } from 'execa';
import fs from 'fs-extra';
import semver from 'semver';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function run() {
    console.log(chalk.cyan('🚀 Just Scales Unified Release Manager'));

    // 1. Get Current Version from package.json
    const packageJsonPath = path.join(rootDir, 'package.json');
    const pkg = await fs.readJson(packageJsonPath);
    const currentVersion = pkg.version;
    console.log(chalk.blue(`Current Version: ${currentVersion}`));

    // 2. Prompt for Bump
    const { releaseType } = await inquirer.prompt([
        {
            type: 'list',
            name: 'releaseType',
            message: 'Select release type:',
            choices: ['patch', 'minor', 'major'],
        },
    ]);

    const newVersion = semver.inc(currentVersion, releaseType);
    if (!newVersion) {
        console.error(chalk.red('Invalid version increment'));
        process.exit(1);
    }
    console.log(chalk.green(`\nTarget Version: ${newVersion}\n`));

    // Confirm
    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: `Are you sure you want to release v${newVersion}?`,
            default: false,
        },
    ]);

    if (!confirm) {
        console.log(chalk.yellow('Release cancelled.'));
        process.exit(0);
    }

    // 3. Update Files
    console.log(chalk.yellow('\n📝 Updating Files...'));

    // Update package.json
    pkg.version = newVersion;
    await fs.writeJson(packageJsonPath, pkg, { spaces: 2 });
    console.log(chalk.green('✔ Updated package.json'));

    // Update android/app/build.gradle
    const gradlePath = path.join(rootDir, 'android', 'app', 'build.gradle');
    if (await fs.pathExists(gradlePath)) {
        let gradleContent = await fs.readFile(gradlePath, 'utf-8');

        // Update versionName
        gradleContent = gradleContent.replace(
            /versionName\s+"[^"]+"/,
            `versionName "${newVersion}"`
        );

        // Update versionCode (increment)
        gradleContent = gradleContent.replace(/versionCode\s+(\d+)/, (match, code) => {
            const newCode = parseInt(code, 10) + 1;
            return `versionCode ${newCode}`;
        });

        await fs.writeFile(gradlePath, gradleContent);
        console.log(chalk.green('✔ Updated build.gradle (versionName & versionCode)'));
    } else {
        console.warn(chalk.yellow('⚠ android/app/build.gradle not found, skipping Android version update.'));
    }

    // Update CHANGELOG.md
    const changelogPath = path.join(rootDir, 'CHANGELOG.md');
    if (await fs.pathExists(changelogPath)) {
        let changelog = await fs.readFile(changelogPath, 'utf-8');
        const date = new Date().toISOString().split('T')[0];
        const header = `## [${newVersion}] - ${date}`;

        // Replace First Unreleased Header
        if (changelog.includes('## [Unreleased]')) {
            changelog = changelog.replace(
                '## [Unreleased]',
                `## [Unreleased]\n\n${header}`
            );
            await fs.writeFile(changelogPath, changelog);
            console.log(chalk.green('✔ Updated CHANGELOG.md'));
        } else {
            console.warn(chalk.yellow('⚠ CHANGELOG.md does not contain "## [Unreleased]", skipping update.'));
        }
    }

    // 4. Build Processes
    console.log(chalk.yellow('\n🔨 Starting Builds...'));

    // JAVA_HOME Detection for Android
    if (!process.env.JAVA_HOME) {
        console.log(chalk.yellow('⚠ JAVA_HOME not set. Attempting to locate Android Studio JBR...'));
        const possiblePaths = [
            'C:\\Program Files\\Android\\Android Studio\\jbr',
            'C:\\Program Files\\Android\\Android Studio\\jre',
            path.join(process.env.LOCALAPPDATA || '', 'Android', 'Sdk', 'jbr')
        ];

        for (const p of possiblePaths) {
            if (await fs.pathExists(p)) {
                console.log(chalk.green(`✔ Found JBR at: ${p}`));
                process.env.JAVA_HOME = p;
                // Prepend to PATH as well
                process.env.PATH = `${path.join(p, 'bin')}${path.delimiter}${process.env.PATH}`;
                break;
            }
        }

        if (!process.env.JAVA_HOME) {
            console.error(chalk.red('❌ Could not locate JAVA_HOME. Android build may fail.'));
            console.log(chalk.yellow('Please set JAVA_HOME environment variable to your JDK/JBR location.'));
        }
    }

    try {
        // Web Build
        console.log(chalk.cyan(' Building Web App (Vite)...'));
        await execa('npm', ['run', 'build'], { stdio: 'inherit', cwd: rootDir });
        console.log(chalk.green('✔ Web Build Complete'));

        // Android Build
        console.log(chalk.cyan(' Building Android APK...'));
        await execa('npx', ['cap', 'sync'], { stdio: 'inherit', cwd: rootDir });
        // Use gradlew.bat on Windows if available, else gradlew
        const gradlew = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
        await execa(path.join(rootDir, 'android', gradlew), ['assembleRelease'], {
            cwd: path.join(rootDir, 'android'),
            stdio: 'inherit'
        });
        console.log(chalk.green('✔ Android Release Build Complete'));

        // Windows Build
        console.log(chalk.cyan(' Building Windows Portable (Electron)...'));
        // We only need to run electron-builder, assuming build is already done by web step? 
        // Actually electron:build runs build again. Let's run the full electron:build to be safe, or just electron-builder if we trust the dist.
        // package.json script: "electron:build": "tsc -b && vite build && tsc -p tsconfig.electron.json && electron-builder"
        await execa('npm', ['run', 'electron:build'], { stdio: 'inherit', cwd: rootDir });
        console.log(chalk.green('✔ Windows Build Complete'));

    } catch (error) {
        console.error(chalk.red('\n❌ Build Failed:'), error);
        process.exit(1);
    }

    // 5. Collect Artifacts
    console.log(chalk.yellow('\n📦 Collecting Artifacts...'));

    // Wait for file handles to be released
    await new Promise(resolve => setTimeout(resolve, 2000));

    const releaseDir = path.join(rootDir, 'release', `v${newVersion}`);
    await fs.ensureDir(releaseDir);

    // Move Android APK
    // Default path: android/app/build/outputs/apk/release/app-release.apk
    const apkSource = path.join(rootDir, 'android', 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk');
    const apkDest = path.join(releaseDir, `JustScales-${newVersion}.apk`);

    if (await fs.pathExists(apkSource)) {
        await fs.copy(apkSource, apkDest);
        console.log(chalk.green(`✔ Copied APK to ${path.relative(rootDir, apkDest)}`));
    } else {
        console.warn(chalk.red(`⚠ APK not found at ${apkSource}`));
    }

    // Move Windows Artifacts
    // Electron builder output is in release/ (root release folder)
    // We want to move the relevant files to the version subfolder
    const winReleaseRoot = path.join(rootDir, 'release');
    const files = await fs.readdir(winReleaseRoot);

    for (const file of files) {
        // Avoid moving the version directory itself into itself
        if (file === `v${newVersion}`) continue;

        // Look for .exe, .zip
        if (file.endsWith('.exe') || file.endsWith('.zip')) {
            const src = path.join(winReleaseRoot, file);
            const dest = path.join(releaseDir, file);

            // Check if it's a file before moving
            try {
                const stat = await fs.stat(src);
                if (stat.isFile()) {
                    // Wait a bit more for file locks if needed, or retry?
                    // actually the global delay above should cover it.
                    await fs.move(src, dest, { overwrite: true });
                    console.log(chalk.green(`✔ Moved ${file}`));
                }
            } catch (err) {
                console.warn(chalk.yellow(`⚠ Could not move ${file}: ${err.message}`));
            }
        }
    }

    console.log(chalk.green(`\n✔ Artifacts collected in release/v${newVersion}/`));

    // 6. Git Operations
    const { gitPush } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'gitPush',
            message: 'Commit, Tag, and Push changes?',
            default: true
        }
    ]);

    if (gitPush) {
        try {
            await execa('git', ['add', '.'], { cwd: rootDir });
            await execa('git', ['commit', '-m', `release: v${newVersion}`], { cwd: rootDir });
            await execa('git', ['tag', '-a', `v${newVersion}`, '-m', `Release v${newVersion}`], { cwd: rootDir });
            console.log(chalk.green('✔ Git Commit and Tag created'));

            console.log(chalk.yellow('⚠ Skipping auto-push. Please push manually when ready: git push && git push --tags'));
            // await execa('git', ['push', 'origin', 'main'], { cwd: rootDir });
            // await execa('git', ['push', '--tags'], { cwd: rootDir });
        } catch (e) {
            console.error(chalk.red('Git operations failed'), e);
        }
    }

    console.log(chalk.magenta(`\n✨ Release v${newVersion} process complete! ✨`));
}

run().catch(console.error);
