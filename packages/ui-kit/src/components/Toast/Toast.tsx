import './toastOverrides.scss'

import React from 'react'
import { cssTransition, ToastContainer, ToastPosition } from 'react-toastify'

import { ToastCloseButton } from './components'
import { convertToReactToastifyOptions } from './helpers'
import styles from './Toast.module.scss'

const Zoom = cssTransition({
  enter: styles.zoomIn,
  exit: styles.zoomOut,
})

export interface ToastProps {
  position?: ToastPosition
  autoCloseTime?: number
  isAutoClose?: boolean
}

export const Toast = (props: ToastProps): JSX.Element => {
  const convertedOptions = convertToReactToastifyOptions(props)

  return (
    <ToastContainer
      {...convertedOptions}
      closeOnClick={false}
      closeButton={ToastCloseButton}
      draggable={false}
      hideProgressBar
      transition={Zoom}
      newestOnTop
    />
  )
}
