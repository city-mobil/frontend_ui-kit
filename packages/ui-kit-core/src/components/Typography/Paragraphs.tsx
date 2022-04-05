import cx from 'classnames'
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  memo,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes,
} from 'react'

import { getColorName, getFontWeight } from './helpers'
import { CommonElement, TextProps } from './types'

type GetParagraphComponentReturn = ForwardRefExoticComponent<
  PropsWithoutRef<PropsWithChildren<TextProps>> & RefAttributes<HTMLElement>
>

const getParagraphComponent = (tag: CommonElement, baseClass: string): GetParagraphComponentReturn =>
  forwardRef<HTMLElement, PropsWithChildren<TextProps>>(function AbstractParagraph(
    { as, className, colorName, fontWeight, children, ...props },
    ref,
  ) {
    const Component = as ?? tag
    const classNames = cx(baseClass, className)
    const style = { ...getColorName(colorName), ...getFontWeight(fontWeight) }

    return (
      <Component
        className={classNames}
        style={style}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  })

export const P12 = memo(getParagraphComponent('p', 'city_ui_p12'))
export const P13 = memo(getParagraphComponent('p', 'city_ui_p13'))
export const P15 = memo(getParagraphComponent('p', 'city_ui_p15'))
export const P17 = memo(getParagraphComponent('p', 'city_ui_p17'))
