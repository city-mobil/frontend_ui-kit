import React from 'react'
import { toast } from 'react-toastify'

import { ToastContent, ToastContentProps, ToastProps } from '../components/Toast'
import { convertToReactToastifyOptions } from '../components/Toast/helpers'

class ToastService {
  error(text: ToastContentProps['text'], options?: ToastProps): void {
    const toastOptions = convertToReactToastifyOptions(options)
    toast.error(<ToastContent text={text} type={'error'} />, toastOptions)
  }

  success(text: ToastContentProps['text'], options?: ToastProps): void {
    const toastOptions = convertToReactToastifyOptions(options)
    toast.success(<ToastContent text={text} type={'success'} />, toastOptions)
  }
}

export const toastService = new ToastService()
