import React from 'react'
import styles from './CollorPalette.module.scss'
import cx from 'classnames'
import { useTheme } from '@city/ui-kit-core'

export default {
  title: 'ColorThemes',
}

const descriptions = {
  primary:
    'Акцентный цвет. Выделяет основные элементы, которые должны быть максимально заметны или призывать к действию на экране',
  accent:
    'Используется для большей связки с внешним брендом и для выделения дополнительных элементов, таких как иллюстрации, акции и пр.',
  link: 'Используется как дополнительный к акцентному. Так же для служебных целей — кодирование информации, выделение ссылок, зонирование контрастом.',
  danger: '',
  success: '',
}

interface IColor {
  hex: string
  name: string
  className?: string
}

const Color = ({ hex, name, className }: IColor) => {
  const baseNameMatch = /[^0-9]+/.exec(name)
  const baseName = baseNameMatch ? baseNameMatch[0] : ''
  const numberMatch = /\d+/.exec(name)
  const fontWeightNumber = numberMatch ? parseInt(numberMatch[0], 10) : 0
  const isGray = baseName === 'gray'
  const fw500 = fontWeightNumber === 500
  const fw700 = fontWeightNumber === 700
  const fwOver400 = fontWeightNumber > 400
  return (
    <div className={cx(styles.colorStyled, className)} style={{ backgroundColor: hex }}>
      <div
        className={cx(styles.colorName, {
          [styles.gray]: isGray,
          [styles.fw500]: fw500,
          [styles.fw700]: fw700,
          [styles.fwOver400]: fwOver400,
        })}
      >
        <div className="mb-12">
          {baseName} {fontWeightNumber}
        </div>
        <div>{hex.toUpperCase()}</div>
      </div>
    </div>
  )
}

const getBorderStyle = (hex: string): string => (hex.toUpperCase() === '#FFFFFF' ? styles.withBorder : '')

const ColorVariants = ({ baseName, colors, description }: any) => {
  return (
    <div className="mb-36">
      <div className={cx('mb-8', 'city_ui_h4', styles.h4)}>{baseName}</div>
      <div className={cx(styles.description, 'mb-24')}>{description}</div>
      <div className={styles.flex}>
        {Object.keys(colors).map((colorName) => (
          <Color
            hex={colors[colorName]}
            key={colorName}
            name={colorName}
            className={getBorderStyle(colors[colorName])}
          />
        ))}
      </div>
    </div>
  )
}

const sortingFunc = (a: string, b: string) => {
  if (a > b) {
    return -1
  }

  if (a < b) {
    return 1
  }

  return 0
}

const ThemeExample = () => {
  const { theme } = useTheme()

  if (!theme) return null

  return (
    <div className={styles.container}>
      <h1 className="mb-8">Базовые цвета</h1>
      <div className="city_ui_p13 mb-36">
        Цветовая палитра ULTRA включает в себя 6 базовых цветов, на основе которых алгоритмически сформированы 48
        <br />
        дополнительных оттенков
      </div>
      {Object.keys(descriptions).map((baseName) => (
        <ColorVariants
          key={baseName}
          colors={Object.keys(theme)
            .filter((colorName) => RegExp(`${baseName}\\d+`).exec(colorName))
            .sort(sortingFunc)
            .reduce((filteredColors, colorName) => {
              filteredColors[colorName] = theme[colorName as keyof typeof theme]

              return filteredColors
            }, {} as Record<string, string>)}
          description={descriptions[baseName as keyof typeof descriptions]}
          baseName={baseName}
        />
      ))}

      <h1 className="mt-42 mb-8">Нейтральные цвета</h1>
      <div className="city_ui_p13 mb-30">
        Цветовая палитра ULTRA также включает в себя линейку нейтральных цветов и градацию оттенков серого для
        использования
        <br />в общих элементах системы
      </div>
      <ColorVariants
        colors={Object.keys(theme)
          .filter((colorName) => colorName.includes('gray'))
          .reduce((filteredColors, colorName) => {
            filteredColors[colorName] = theme[colorName as keyof typeof theme]

            return filteredColors
          }, {} as Record<string, string>)}
      />
    </div>
  )
}

export const ColorPalette = () => <ThemeExample />
