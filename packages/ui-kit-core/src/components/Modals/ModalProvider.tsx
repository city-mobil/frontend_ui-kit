import React, { ComponentType, FC, useCallback, useMemo, useRef, useState } from 'react'

import { defaultModalContext, defaultModalOptions, modalContext } from './modalContext'
import { ModalContext, ModalOpenOptions, ModalProps } from './types'

type MutableModalContext = Omit<ModalContext, 'openModal' | 'closeModal' | 'removeModal' | 'in'>

interface CallbackWithValue {
  callback: (value: any) => void
  value: any
}

export const ModalProvider: FC = ({ children }) => {
  // result of modal execution, does not require re-render
  const result = useRef<CallbackWithValue | null>(null)

  const [context, setContext] = useState<MutableModalContext>(defaultModalContext)
  const [inProp, setInProp] = useState<boolean>(false)

  // start exit animation
  const closeModal = useCallback(() => {
    setInProp(false)
  }, [])

  // open modal
  const openModal = useCallback(
    (component: ComponentType<ModalProps>, options: ModalOpenOptions): Promise<any> => {
      return new Promise((resolve, reject) => {
        setContext((oldContext) => {
          return {
            ...oldContext,
            component,
            options: { ...defaultModalOptions, ...options },
            onSuccess: (value) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              result.current = { callback: resolve, value }
              closeModal()
            },
            onCancel: (value) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              result.current = { callback: reject, value }
              closeModal()
            },
          }
        })
        setInProp(true)
      })
    },
    [closeModal],
  )

  // remove modal after exit animation is finished
  // can be called to close modal without animation
  const removeModal = useCallback(() => {
    setInProp(false)
    setContext((oldContext) => {
      return {
        ...oldContext,
        component: null,
        options: defaultModalOptions,
        onSuccess: (): null => null,
        onCancel: (): null => null,
      }
    })
    if (result.current) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { callback, value } = result.current
      callback && callback(value)
    }
  }, [])

  const fullContext = useMemo<ModalContext>(
    // @ts-ignore
    () => ({ ...context, in: inProp, openModal, removeModal, closeModal }),
    [context, inProp, openModal, removeModal, closeModal],
  )

  return <modalContext.Provider value={fullContext}>{children}</modalContext.Provider>
}
