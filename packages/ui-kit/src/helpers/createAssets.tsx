import React from 'react'

interface IconProps {
  source: {
    main: string
    hight: string
  }
}

const Icon: React.FC<IconProps> = ({ source }) => (
  <img alt="img" src={source.main} srcSet={`${source.main} 1x, ${source.hight} 2x`} />
)

export const createAssets = <T extends Record<string, IconProps['source']>>(
  iconsSource: T,
): Record<keyof T, React.FC> => {
  type Icons = keyof T

  const assets = Object.entries(iconsSource).reduce((acc, [key, source]) => {
    const Comp: React.FC = () => <Icon source={source} />
    Comp.displayName = 'Icon' + key
    acc[key as Icons] = Comp

    return acc
  }, {} as Record<Icons, React.FC>)

  return assets
}
