#!/usr/bin/env node

import util from 'util'
import fs from 'fs'
import path from 'path'

interface Theme {
  name: string
  stylesMap: Record<string, string>
  mainPalette: Record<string, string>
}

type ThemesMap = Record<string, Record<string, string>>

const generatedPath = path.join(__dirname, '..', 'src/generated/')
const themesFilePath = `${generatedPath}themes.scss`
const typesFilePath = `${generatedPath}types.ts`

const prepare = (): void => {
  if (fs.existsSync(generatedPath)) {
    fs.rmdirSync(generatedPath, { recursive: true })
  }

  if (fs.existsSync(themesFilePath)) {
    fs.unlinkSync(themesFilePath)
  }

  if (fs.existsSync(typesFilePath)) {
    fs.unlinkSync(typesFilePath)
  }

  fs.mkdirSync(generatedPath, { recursive: true })
  fs.writeFileSync(themesFilePath, '', 'utf-8')
  fs.writeFileSync(typesFilePath, '', 'utf-8')
}

const generateScssTheme = (name: string, theme: Record<string, string>): void => {
  const outputName = generatedPath + name + '.scss'
  let output = `.${name} {\n`

  for (const [key, value] of Object.entries(theme)) {
    output += `  --${key}: ${value};\n`
  }

  output += '}'

  if (fs.existsSync(outputName)) {
    fs.unlinkSync(outputName)
  }

  fs.writeFileSync(outputName, output, 'utf-8')
}

const appendThemeToRoot = (name: string): void => {
  const importPath = `@import './${name}.scss';\n`

  fs.appendFileSync(themesFilePath, importPath)
}

const generateTypes = (themes: ThemesMap): void => {
  const themesArray = Object.entries(themes)
  const themeNames: string[] = []
  const themeValues: string[] = []

  themesArray.forEach(([name, values]) => {
    themeNames.push(`'${name}'`)
    themeValues.push(...Object.keys(values))
  })

  const colorNames = [...new Set(themeValues)]

  const themeNamesType = `export type ThemeName = ${themeNames.join(' | ')}\n\n`
  let colorNameType = 'export type ColorName ='

  for (const colorName of colorNames) {
    colorNameType += `\n  | '${colorName}'`
  }

  colorNameType += '\n\n'

  const themeType = 'export type Theme = Record<ColorName, string>\n\n'
  const themesType = 'export type Themes = Record<ThemeName, Theme>'

  fs.appendFileSync(typesFilePath, themeNamesType)
  fs.appendFileSync(typesFilePath, colorNameType)
  fs.appendFileSync(typesFilePath, themeType)
  fs.appendFileSync(typesFilePath, themesType)
}

const generateTsTheme = (themes: ThemesMap): void => {
  let output = "import { Themes } from './types'\n\n"

  output += `export const themes: Themes = ${util.inspect(themes)}`

  fs.writeFileSync(`${generatedPath}themes.ts`, output, 'utf-8')
}

const run = (): void => {
  prepare()

  const themeFiles = fs.readdirSync(path.join(__dirname, 'rawThemes/'))
  const themes: ThemesMap = {}
  const stylesVarsKeys = new Set<string>()

  for (const fileName of themeFiles) {
    if (fileName === 'README.md') {
      continue
    }

    const rawTheme = fs.readFileSync(path.join(__dirname, 'rawThemes/' + fileName), { encoding: 'utf-8' })
    const { Theme } = JSON.parse(rawTheme) as Record<'Theme', Theme>
    const themeVars = {
      ...Theme.stylesMap,
      ...Theme.mainPalette,
    }

    themes[Theme.name] = themeVars

    for (const themeVar of Object.keys(themeVars)) {
      stylesVarsKeys.add(themeVar)
    }

    generateScssTheme(Theme.name, themes[Theme.name])
    appendThemeToRoot(Theme.name)
  }

  generateTypes(themes)
  generateTsTheme(themes)
}

run()
