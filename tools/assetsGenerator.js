#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camelcase_1 = __importDefault(require("camelcase"));
const fs_1 = require("fs");
const PATH_ASSETS = './packages/ui-kit/src/assets';
const PATH_SVG = `${PATH_ASSETS}/svg`;
const PATH_ICONS = `${PATH_ASSETS}/icons`;
const getComponentContent = (svgFileName, componentName) => `import React, { SVGProps } from 'react'
import { ReactComponent as SVGIcon } from '../svg/${svgFileName}'

export const ${componentName} = (props: SVGProps<SVGSVGElement>): JSX.Element => {
  return <SVGIcon {...props} />
}
`;
const generateIcons = (pathSource, pathOutput) => {
    const filesNames = (0, fs_1.readdirSync)(pathSource);
    for (const fileName of filesNames) {
        if (!fileName.endsWith('.svg'))
            continue;
        const camelName = (0, camelcase_1.default)(fileName, { pascalCase: true }).replace('Svg', '');
        const tsxContent = getComponentContent(fileName, camelName);
        (0, fs_1.writeFileSync)(`${pathOutput}/${camelName}.tsx`, tsxContent, { flag: 'w+' });
        (0, fs_1.writeFileSync)(`${pathOutput}/index.ts`, `export * from './${camelName}'\n`, { flag: 'a+' });
    }
};
const run = () => {
    if ((0, fs_1.existsSync)(PATH_ICONS)) {
        (0, fs_1.rmSync)(PATH_ICONS, { recursive: true });
    }
    (0, fs_1.mkdirSync)(PATH_ICONS);
    generateIcons(PATH_SVG, PATH_ICONS);
};
run();
