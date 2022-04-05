import { Typography } from '@city/ui-kit-core'
import cx from 'classnames'
import React from 'react'

import { Button } from '../Buttons'
import { InfoIcons } from './assets'
import styles from './InfoPanel.module.scss'
import { InfoPanelBaseProps, InfoPanelIcons, InfoPanelProps } from './types'

const InfoPanelCommon = ({
  title,
  content,
  button,
  variant = 'normal',
  icon,
  className,
}: InfoPanelBaseProps): JSX.Element => {
  const isButtonShow = button && !button.isHidden
  const Icon = InfoIcons[icon]

  return (
    <div className={cx(styles.panel, { [styles.panel_error]: variant === 'error' }, className)}>
      <div className={styles.icon}>
        <Icon />
      </div>
      <div className={styles.content}>
        <Typography.H5 colorName="secondaryText">{title}</Typography.H5>
        <Typography.P13 className="mt-8" colorName="secondaryText">
          {content}
        </Typography.P13>
        {isButtonShow && (
          <Button className="mt-24" variant="secondary" size="sm" {...button}>
            {button?.name}
          </Button>
        )}
      </div>
    </div>
  )
}

export const InfoPanel = Object.keys(InfoIcons).reduce((acc, key) => {
  const Comp = (props: InfoPanelProps): JSX.Element => <InfoPanelCommon {...props} icon={key as InfoPanelIcons} />
  acc[key as keyof typeof InfoIcons] = Comp

  return acc
}, {} as Record<InfoPanelIcons, React.FC<InfoPanelProps>>)
