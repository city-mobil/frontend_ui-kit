#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const inquirer_1 = __importDefault(require("inquirer"));
const child_process_1 = require("child_process");
async function run() {
    const isGitClean = (0, helpers_1.checkIsGitClean)();
    const currentBranch = (0, helpers_1.getCurrentBranch)();
    const isLerna = (0, helpers_1.checkIsInLernaMonorepo)();
    const hasPackageJSON = (0, helpers_1.checkHasPackageJSON)();
    if (!isLerna && !hasPackageJSON) {
        console.log('Execute script from project root');
        process.exit(1);
    }
    try {
        if (!isGitClean) {
            (0, helpers_1.gitStashPush)();
        }
        (0, helpers_1.checkoutToMaster)();
        (0, helpers_1.pullUpdates)();
    }
    catch (e) {
        (0, helpers_1.returnToInitialState)(isGitClean, currentBranch);
        process.exit(1);
    }
    const { bump } = await inquirer_1.default.prompt([
        {
            type: 'list',
            message: 'Select bump',
            name: 'bump',
            choices: helpers_1.BUMPS,
        },
    ]);
    const executor = isLerna ? 'npx lerna' : 'npm';
    (0, child_process_1.execSync)(`${executor} version ${bump} --force-publish --yes`, { stdio: 'inherit' });
    (0, helpers_1.returnToInitialState)(isGitClean, currentBranch);
}
void run();
