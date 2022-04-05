import { OverlayRef, useUniqueId } from '@city/ui-kit-core'
import cx from 'classnames'
import React from 'react'

import { ReactComponent as ClearIndicatorIcon } from '../../../assets/svg/ic-reset-value.svg'
import { ReactComponent as WarningIcon } from '../../../assets/svg/ic-warning.svg'
import { Size } from '../../../types'
import styles from '../../styles/InputIcons.module.scss'
import { FieldErrorTooltip } from '../FieldErrorTooltip'

export interface InputSuffixIconsProps {
  size: Size
  showErrorIcon: boolean
  showClear: boolean
  iconRef: React.MutableRefObject<HTMLDivElement | null>
  errorTooltipText?: string
  suffixIconContainerClassName?: string
  SuffixIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  tooltipRef?: React.MutableRefObject<OverlayRef | null>
  rootId?: string
  handleMouseEnterIcon: () => void
  handleClear: () => void
  onSuffixIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const InputSuffixIcons = ({
  size,
  showErrorIcon,
  showClear,
  iconRef,
  tooltipRef,
  errorTooltipText,
  suffixIconContainerClassName,
  SuffixIcon,
  handleMouseEnterIcon,
  handleClear,
  onSuffixIconClick,
  rootId,
}: InputSuffixIconsProps): JSX.Element => {
  const iconsContainerRightClassName = styles[`iconsContainer__right__${size}`]

  const tooltipId = useUniqueId('Input_error_tooltip')

  return (
    <>
      <div className={cx(styles.iconsContainer, iconsContainerRightClassName)}>
        {(showErrorIcon || showClear) && (
          <div
            className={cx(styles.iconContainer, {
              [styles.iconContainer__isError]: showErrorIcon,
              [styles.iconContainer__interactable]: !showErrorIcon && showClear,
            })}
            id={tooltipId}
            onMouseDown={showClear ? handleClear : undefined}
            onMouseEnter={handleMouseEnterIcon}
            ref={iconRef}
            role="presentation"
          >
            {showErrorIcon ? <WarningIcon /> : <ClearIndicatorIcon />}
          </div>
        )}
        {SuffixIcon && (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            className={cx(
              styles.iconContainer,
              {
                [styles.iconContainer__interactable]: !!onSuffixIconClick,
              },
              suffixIconContainerClassName,
            )}
            onMouseDown={onSuffixIconClick}
          >
            <SuffixIcon />
          </div>
        )}
      </div>

      {showErrorIcon && (
        <FieldErrorTooltip targetId={tooltipId} size={size} ref={tooltipRef} rootId={rootId}>
          {errorTooltipText}
        </FieldErrorTooltip>
      )}
    </>
  )
}
