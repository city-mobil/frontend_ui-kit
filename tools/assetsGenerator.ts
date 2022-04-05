#!/usr/bin/env node

import camelCase from 'camelcase'
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'fs'

const PATH_ASSETS = './packages/ui-kit/src/assets'
const PATH_SVG = `${PATH_ASSETS}/svg`
const PATH_ICONS = `${PATH_ASSETS}/icons`

const getComponentContent = (svgFileName: string, componentName: string): string =>
  `import React, { SVGProps } from 'react'
import { ReactComponent as SVGIcon } from '../svg/${svgFileName}'

export const ${componentName} = (props: SVGProps<SVGSVGElement>): JSX.Element => {
  return <SVGIcon {...props} />
}
`

const generateIcons = (pathSource: string, pathOutput: string): void => {
  const filesNames = readdirSync(pathSource)

  for (const fileName of filesNames) {
    if (!fileName.endsWith('.svg')) continue

    const camelName = camelCase(fileName, { pascalCase: true }).replace('Svg', '')
    const tsxContent = getComponentContent(fileName, camelName)

    writeFileSync(`${pathOutput}/${camelName}.tsx`, tsxContent, { flag: 'w+' })
    writeFileSync(`${pathOutput}/index.ts`, `export * from './${camelName}'\n`, { flag: 'a+' })
  }
}

const run = (): void => {
  if (existsSync(PATH_ICONS)) {
    rmSync(PATH_ICONS, { recursive: true })
  }

  mkdirSync(PATH_ICONS)

  generateIcons(PATH_SVG, PATH_ICONS)
}

run()
