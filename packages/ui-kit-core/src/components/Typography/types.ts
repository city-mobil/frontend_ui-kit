import { AnchorHTMLAttributes, HTMLAttributes } from 'react'

import type { ColorName } from '../../generated/types'

export type { ColorName }

export type HeaderElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type CommonElement = 'div' | 'p' | 'span' | 'a'

export type FontWeight = 'bold' | 'medium' | 'regular'

/**
 * Тип, включающий все возможные html аттрибуты для типографики в целом.
 * Нас интересует HTMLAttributes, но AnchorHTMLAttributes - подмножество HTMLAttributes, поэтому используем более широкий тип.
 */
export type CommonProps = AnchorHTMLAttributes<HTMLElement>

/**
 * Специфичные для <a /> html аттрибуты.
 */
export type LinkProps = Omit<CommonProps, keyof HTMLAttributes<HTMLElement>>

export interface HeaderProps extends CommonProps {
  as?: CommonElement
  colorName?: ColorName
}

export interface TextProps extends CommonProps {
  as?: CommonElement
  colorName?: ColorName
  fontWeight?: FontWeight
}

export type TypographyAsElements = CommonElement
export type TypographyFontWeight = FontWeight
export type TypographyColorName = ColorName
export type TypographyHeaderProps = HeaderProps
export type TypographyTextProps = TextProps
export type TypographyCommonProps = CommonProps
export type TypographyLinkProps = LinkProps
