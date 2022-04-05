import { Typography } from '@city/ui-kit-core'
import cx from 'classnames'
import React from 'react'

import { ReactComponent as Logo } from '../../assets/svg/logo.svg'
import { Button } from '../Buttons'
import { ErrorIcons } from './assets'
import styles from './ErrorPage.module.scss'
import { ErrorPageBaseProps, ErrorPageProps, ErrorsPageIconsType } from './types'

const ErrorPageCommon: React.FC<ErrorPageBaseProps> = ({ title, content, button, className, icon }) => {
  const isButtonShow = button && !button.isHidden

  const Icon = ErrorIcons[icon]

  return (
    <div className={cx(styles.container, className)}>
      <Logo className={styles.logo} />
      <div className={styles.rightSide}>
        <div className={styles.iconContainer}>
          <Icon />
        </div>
        <div className={styles.content}>
          <Typography.H1 className="mt-0 mb-16" colorName="secondaryText">
            {title}
          </Typography.H1>
          <Typography.P15 colorName="secondaryText">{content}</Typography.P15>
          {isButtonShow && (
            <Button className="mt-24" variant="secondary" size="sm" {...button}>
              {button?.name}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export const ErrorPage = Object.keys(ErrorIcons).reduce((acc, key) => {
  const typedKey = key as ErrorsPageIconsType
  const Comp: React.FC<ErrorPageProps> = (props) => <ErrorPageCommon {...props} icon={typedKey} />
  acc[typedKey] = Comp

  return acc
}, {} as Record<ErrorsPageIconsType, React.FC<ErrorPageProps>>)
