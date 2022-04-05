import React, { useCallback, useContext } from 'react'

import { Portal } from '../Portal'
import { modalContext } from './modalContext'
import styles from './Modals.module.scss'

export const ModalRoot = (): JSX.Element | null => {
  const context = useContext(modalContext)
  const { component: Component, in: inProp, options, onSuccess, onCancel, removeModal } = context
  const {
    backdropTransition: BackdropTransition,
    modalTransition: ModalTransition,
    animationContainer: AnimationContainer,
    closeOnBackdropClick,
    noBackdrop,
    timeout,
    props,
  } = options

  const onExit = useCallback(() => {
    removeModal && removeModal()
  }, [removeModal])

  const onBackdropClick = useCallback(() => {
    if (closeOnBackdropClick) {
      onCancel && onCancel(null)
    }
  }, [closeOnBackdropClick, onCancel])

  if (!Component || !BackdropTransition || !AnimationContainer || !ModalTransition) return null

  return (
    <Portal>
      <div className={styles.wrapper}>
        <BackdropTransition in={inProp} timeout={timeout}>
          {!noBackdrop && <div className={styles.backdrop} onClick={onBackdropClick} role="presentation" />}
        </BackdropTransition>
      </div>

      <AnimationContainer>
        <ModalTransition in={inProp} timeout={timeout} onExit={onExit}>
          <Component {...props} onSuccess={onSuccess} onCancel={onCancel} />
        </ModalTransition>
      </AnimationContainer>
    </Portal>
  )
}
