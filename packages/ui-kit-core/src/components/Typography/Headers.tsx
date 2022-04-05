import cx from 'classnames'
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  memo,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes,
} from 'react'

import { getColorName } from './helpers'
import { HeaderElement, HeaderProps } from './types'

type GetHeadComponentReturn = ForwardRefExoticComponent<
  PropsWithoutRef<PropsWithChildren<HeaderProps>> & RefAttributes<HTMLElement>
>

const getHeadComponent = (tag: HeaderElement, baseClass: string): GetHeadComponentReturn =>
  forwardRef<HTMLElement, PropsWithChildren<HeaderProps>>(function AbstractHeader(
    { as, className, colorName, children, ...props },
    ref,
  ) {
    const Component = as ?? tag
    const classNames = cx(baseClass, className)
    const style = getColorName(colorName)

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

export const H1 = memo(getHeadComponent('h1', 'city_ui_h1'))
export const H2 = memo(getHeadComponent('h2', 'city_ui_h2'))
export const H3 = memo(getHeadComponent('h3', 'city_ui_h3'))
export const H4 = memo(getHeadComponent('h4', 'city_ui_h4'))
export const H5 = memo(getHeadComponent('h5', 'city_ui_h5'))
export const H6 = memo(getHeadComponent('h6', 'city_ui_h6'))
