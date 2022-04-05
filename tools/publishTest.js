#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const helpers_1 = require("./helpers");
const run = async () => {
    const isOnline = await (0, helpers_1.checkIsOnline)();
    if (!isOnline) {
        console.log('Error, you are offline');
        process.exit(1);
    }
    const isLerna = (0, helpers_1.checkIsInLernaMonorepo)();
    const hasPackageJSON = (0, helpers_1.checkHasPackageJSON)();
    if (!isLerna && !hasPackageJSON) {
        console.log('Execute script from project root');
        process.exit(1);
    }
    const executor = isLerna ? 'npx lerna' : 'npm';
    try {
        (0, helpers_1.syncVersionWithRegistry)('test', isLerna);
    }
    catch (e) {
        process.exit(1);
    }
    (0, child_process_1.execSync)(`${executor} version prerelease --preid test --force-publish --yes`, { stdio: 'inherit' });
};
void run();
