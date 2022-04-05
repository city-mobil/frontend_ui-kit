import React, { useCallback } from 'react'

import { ReactComponent as SvgArrowPrev } from '../../../assets/svg/ic-arrow-left.svg'
import { ReactComponent as SvgArrowNext } from '../../../assets/svg/ic-arrow-right.svg'
import { IconButton } from '../../Buttons/IconButton/IconButton'
import styles from './NavBar.module.scss'

export interface INavBarProps {
  onPreviousClick: () => void
  onNextClick: () => void
}

export const NavBar = ({ onPreviousClick, onNextClick }: INavBarProps): JSX.Element => {
  const handlePrev = useCallback(() => onPreviousClick(), [onPreviousClick])
  const handleNext = useCallback(() => onNextClick(), [onNextClick])

  return (
    <div className={styles.container}>
      <IconButton onClick={handlePrev} icon={SvgArrowPrev} />
      <IconButton onClick={handleNext} icon={SvgArrowNext} />
    </div>
  )
}
