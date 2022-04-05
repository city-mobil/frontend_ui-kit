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

const getSpanComponent = (tag: CommonElement, baseClass: string): GetParagraphComponentReturn =>
  forwardRef<HTMLElement, PropsWithChildren<TextProps>>(function AbstractSpan(
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

export const S12 = memo(getSpanComponent('span', 'city_ui_s12'))
export const S13 = memo(getSpanComponent('span', 'city_ui_s13'))
export const S15 = memo(getSpanComponent('span', 'city_ui_s15'))
export const S17 = memo(getSpanComponent('span', 'city_ui_s17'))
