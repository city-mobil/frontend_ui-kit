// @ts-nocheck
import React, { ComponentType, useCallback } from 'react'
import { Button, useModal } from '../../..'
import { ModalOpenOptions, ModalProps, TransitionProps, Transitions } from '@city/ui-kit-core'
import { RegularModal } from './modal-examples/RegularModal'
import { RightSideAnimationContainer, RightSideModal } from './modal-examples/RightSideModal'
import { FullscreenModal } from './modal-examples/FullscreenModal'
import styles from './styles.module.scss'

export default {
  title: 'Modals/Modal Types',
}

const OpenModalButton = ({
  Component,
  title,
  animationContainer = null,
  modalTransition,
}: {
  Component: ComponentType<ModalProps>
  title: string
  animationContainer?: ComponentType
  modalTransition: ComponentType<TransitionProps>
}) => {
  const { openModal } = useModal()
  const onClick = useCallback(() => {
    const options: ModalOpenOptions = { modalTransition, timeout: 300 }

    if (animationContainer) {
      options.animationContainer = animationContainer
    }

    openModal(Component, options).catch((error) => error)
  }, [openModal, Component, animationContainer, modalTransition])

  return (
    <div className="mb-8">
      <Button onClick={onClick}>{title}</Button>
    </div>
  )
}

export const Preview = () => {
  return (
    <>
      <OpenModalButton Component={RegularModal} modalTransition={Transitions.FadeInWithScale} title="Обычный модал" />
      <OpenModalButton Component={FullscreenModal} modalTransition={Transitions.FadeIn} title="Полноэкранный модал" />
      <OpenModalButton
        Component={RightSideModal}
        modalTransition={Transitions.SlideInRight}
        animationContainer={RightSideAnimationContainer}
        title="Правая панель"
      />
      <div className={styles.note}>
        Контролы storybook могут перекрывать модал, в обычном приложении модал не будет перекрываться другими
        элементами.
      </div>
    </>
  )
}
