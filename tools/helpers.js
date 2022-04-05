"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUMPS = exports.pullUpdates = exports.returnToInitialState = exports.gitStashPop = exports.gitStashPush = exports.getCurrentBranch = exports.checkoutToMaster = exports.checkoutToBranch = exports.checkIsGitClean = exports.syncVersionWithRegistry = exports.checkIsOnline = exports.checkHasPackageJSON = exports.checkIsInLernaMonorepo = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const dns_1 = __importDefault(require("dns"));
const checkIsInLernaMonorepo = () => {
    const files = (0, child_process_1.execSync)('ls');
    return !!String(files)
        .split('\n')
        .find((fileName) => fileName === 'lerna.json');
};
exports.checkIsInLernaMonorepo = checkIsInLernaMonorepo;
const checkHasPackageJSON = () => {
    const files = (0, child_process_1.execSync)('ls');
    return !!String(files)
        .split('\n')
        .find((fileName) => fileName === 'package.json');
};
exports.checkHasPackageJSON = checkHasPackageJSON;
// эта ф-ия нужна, тк npm view не кидает ошибки в оффлайне
const checkIsOnline = async () => {
    const promise = new Promise((resolve) => {
        dns_1.default.resolve('www.google.com', (err) => {
            if (err) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
    const isOnline = await promise;
    return isOnline;
};
exports.checkIsOnline = checkIsOnline;
const getLastestDistTagVersion = (distTag = 'alpha') => {
    try {
        const npmViewRaw = (0, child_process_1.execSync)(`npm view @city/ui-kit dist-tags.${distTag}`);
        return String(npmViewRaw).replace('\n', '');
    }
    catch (e) {
        console.log('Error while getting latest version\n', e);
        throw e;
    }
};
const readProjectFileAsJSON = (path) => {
    try {
        const fileRaw = (0, fs_1.readFileSync)(path);
        const fileParsed = JSON.parse(fileRaw.toString());
        return fileParsed;
    }
    catch (e) {
        console.log(`Error while reading file ${path}\n`, e);
        throw e;
    }
};
const syncVersionWithRegistry = (distTag, isLerna) => {
    const filePath = isLerna ? './lerna.json' : './package.json';
    const fileParsed = readProjectFileAsJSON(filePath);
    const latestVersion = getLastestDistTagVersion(distTag);
    // проверка для первого запуска в проекте, когда по тегу distTag в регистри еще нет ни 1 публикации
    if (latestVersion) {
        fileParsed.version = latestVersion;
    }
    try {
        (0, fs_1.writeFileSync)(filePath, JSON.stringify(fileParsed, null, '  '));
    }
    catch (e) {
        console.log('Error while writing to file\n', e);
        throw e;
    }
};
exports.syncVersionWithRegistry = syncVersionWithRegistry;
const checkIsGitClean = () => {
    const res = (0, child_process_1.execSync)('git status --porcelain');
    return !String(res);
};
exports.checkIsGitClean = checkIsGitClean;
const checkoutToBranch = (branch) => {
    try {
        const command = `git checkout ${branch}`;
        (0, child_process_1.execSync)(command);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};
exports.checkoutToBranch = checkoutToBranch;
const checkoutToMaster = () => {
    (0, exports.checkoutToBranch)('master');
};
exports.checkoutToMaster = checkoutToMaster;
const getCurrentBranch = () => {
    const currentBranch = (0, child_process_1.execSync)('git branch --show-current');
    return String(currentBranch).replace('\n', '');
};
exports.getCurrentBranch = getCurrentBranch;
const gitStashPush = () => {
    (0, child_process_1.execSync)('git stash push --include-untracked -m "deploy"');
};
exports.gitStashPush = gitStashPush;
const gitStashPop = () => {
    (0, child_process_1.execSync)('git stash pop');
};
exports.gitStashPop = gitStashPop;
const returnToInitialState = (isGitClean, currentBranch) => {
    (0, exports.checkoutToBranch)(currentBranch);
    if (!isGitClean) {
        (0, exports.gitStashPop)();
    }
};
exports.returnToInitialState = returnToInitialState;
const pullUpdates = () => {
    try {
        (0, child_process_1.execSync)('git pull');
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};
exports.pullUpdates = pullUpdates;
exports.BUMPS = ['major', 'minor', 'patch'];
