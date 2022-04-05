#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generatedPath = path_1.default.join(__dirname, '..', 'src/generated/');
const themesFilePath = `${generatedPath}themes.scss`;
const typesFilePath = `${generatedPath}types.ts`;
const prepare = () => {
    if (fs_1.default.existsSync(generatedPath)) {
        fs_1.default.rmdirSync(generatedPath, { recursive: true });
    }
    if (fs_1.default.existsSync(themesFilePath)) {
        fs_1.default.unlinkSync(themesFilePath);
    }
    if (fs_1.default.existsSync(typesFilePath)) {
        fs_1.default.unlinkSync(typesFilePath);
    }
    fs_1.default.mkdirSync(generatedPath, { recursive: true });
    fs_1.default.writeFileSync(themesFilePath, '', 'utf-8');
    fs_1.default.writeFileSync(typesFilePath, '', 'utf-8');
};
const generateScssTheme = (name, theme) => {
    const outputName = generatedPath + name + '.scss';
    let output = `.${name} {\n`;
    for (const [key, value] of Object.entries(theme)) {
        output += `  --${key}: ${value};\n`;
    }
    output += '}';
    if (fs_1.default.existsSync(outputName)) {
        fs_1.default.unlinkSync(outputName);
    }
    fs_1.default.writeFileSync(outputName, output, 'utf-8');
};
const appendThemeToRoot = (name) => {
    const importPath = `@import './${name}.scss';\n`;
    fs_1.default.appendFileSync(themesFilePath, importPath);
};
const generateTypes = (themes) => {
    const themesArray = Object.entries(themes);
    const themeNames = [];
    const themeValues = [];
    themesArray.forEach(([name, values]) => {
        themeNames.push(`'${name}'`);
        themeValues.push(...Object.keys(values));
    });
    const colorNames = [...new Set(themeValues)];
    const themeNamesType = `export type ThemeName = ${themeNames.join(' | ')}\n\n`;
    let colorNameType = 'export type ColorName =';
    for (const colorName of colorNames) {
        colorNameType += `\n  | '${colorName}'`;
    }
    colorNameType += '\n\n';
    const themeType = 'export type Theme = Record<ColorName, string>\n\n';
    const themesType = 'export type Themes = Record<ThemeName, Theme>';
    fs_1.default.appendFileSync(typesFilePath, themeNamesType);
    fs_1.default.appendFileSync(typesFilePath, colorNameType);
    fs_1.default.appendFileSync(typesFilePath, themeType);
    fs_1.default.appendFileSync(typesFilePath, themesType);
};
const generateTsTheme = (themes) => {
    let output = "import { Themes } from './types'\n\n";
    output += `export const themes: Themes = ${util_1.default.inspect(themes)}`;
    fs_1.default.writeFileSync(`${generatedPath}themes.ts`, output, 'utf-8');
};
const run = () => {
    prepare();
    const themeFiles = fs_1.default.readdirSync(path_1.default.join(__dirname, 'rawThemes/'));
    const themes = {};
    const stylesVarsKeys = new Set();
    for (const fileName of themeFiles) {
        if (fileName === 'README.md') {
            continue;
        }
        const rawTheme = fs_1.default.readFileSync(path_1.default.join(__dirname, 'rawThemes/' + fileName), { encoding: 'utf-8' });
        const { Theme } = JSON.parse(rawTheme);
        const themeVars = {
            ...Theme.stylesMap,
            ...Theme.mainPalette,
        };
        themes[Theme.name] = themeVars;
        for (const themeVar of Object.keys(themeVars)) {
            stylesVarsKeys.add(themeVar);
        }
        generateScssTheme(Theme.name, themes[Theme.name]);
        appendThemeToRoot(Theme.name);
    }
    generateTypes(themes);
    generateTsTheme(themes);
};
run();
