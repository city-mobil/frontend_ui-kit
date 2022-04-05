import React, { useCallback } from 'react'
import { Toast, ToastProps } from '../../../components/Toast'
import '../../../components/Toast/toastOverrides.css'
import { toastService } from '../../../services'
import { Button } from '../../../components/Buttons'
import styles from './Toast.module.scss'

export default {
  title: 'Info/Toast',
  component: Toast,
}

export const Preview = ({ position, isAutoClose, autoCloseTime }: ToastProps): JSX.Element => {
  const onSuccessClick = useCallback(() => {
    toastService.success('Lorem ipsum dolor sit amet', {
      autoCloseTime: autoCloseTime,
      isAutoClose: isAutoClose,
    })
  }, [autoCloseTime, isAutoClose])

  const onErrorClick = useCallback(() => {
    toastService.error(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      {
        autoCloseTime: autoCloseTime,
        isAutoClose: isAutoClose,
      },
    )
  }, [autoCloseTime, isAutoClose])

  const onSuccessRedefinedPosition = useCallback(() => {
    toastService.success('Успех!', {
      autoCloseTime: autoCloseTime,
      isAutoClose: isAutoClose,
      position: 'bottom-center',
    })
  }, [autoCloseTime, isAutoClose])

  return (
    <div className={styles.container}>
      <Button onClick={onSuccessClick}>success</Button>
      <Button onClick={onErrorClick}>error</Button>
      <Button onClick={onSuccessRedefinedPosition}>Redefined Position</Button>
      <Toast position={position} isAutoClose={isAutoClose} autoCloseTime={autoCloseTime} />
    </div>
  )
}
