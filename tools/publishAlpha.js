#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const inquirer_1 = __importDefault(require("inquirer"));
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
    const { bump } = await inquirer_1.default.prompt([
        {
            type: 'input',
            message: 'Provide specific version or bump such as major, minor, prepatch, etc',
            name: 'bump',
        },
    ]);
    try {
        (0, helpers_1.syncVersionWithRegistry)('alpha', isLerna);
    }
    catch (e) {
        process.exit(1);
    }
    (0, child_process_1.execSync)(`${executor} version ${bump} --preid alpha --force-publish --yes`, { stdio: 'inherit' });
    process.exit(0);
};
void run();
