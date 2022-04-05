import { ToastOptions } from 'react-toastify'

import { ToastProps } from './Toast'

export const AUTO_CLOSE_TIME = 3500

export const convertToReactToastifyOptions = (options?: ToastProps): ToastOptions => {
  const { isAutoClose = true, autoCloseTime = AUTO_CLOSE_TIME, position = 'top-right' } = options || {}

  return {
    autoClose: isAutoClose && autoCloseTime,
    position,
  }
}
