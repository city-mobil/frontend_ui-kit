import React, { ComponentType, useCallback } from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { Button, useModal } from '../../../index'
import { TransitionProps, Transitions } from '@city/ui-kit-core'
import { RegularModal } from './modal-examples/RegularModal'
import styles from './styles.module.scss'

export default {
  title: 'Modals/Modal Animations',
  decorators: [withKnobs],
}

const OpenModalButton = ({
  transition,
  title,
  noBackdrop = false,
}: {
  transition: ComponentType<TransitionProps>
  title: string
  noBackdrop?: boolean
}): JSX.Element => {
  const { openModal } = useModal()
  const onClick = useCallback(() => {
    openModal(RegularModal, { modalTransition: transition, noBackdrop }).catch(() => {
      // nothing
    })
  }, [noBackdrop, openModal, transition])

  return (
    <div className="mb-8">
      <Button onClick={onClick}>{title}</Button>
    </div>
  )
}

export const Preview = (): JSX.Element => {
  return (
    <>
      <OpenModalButton title="Открыть с анимацией SlideInRight" transition={Transitions.SlideInRight} />
      <OpenModalButton title="Открыть с анимацией SlideInBottom" transition={Transitions.SlideInBottom} />
      <OpenModalButton title="Открыть с анимацией FadeIn" transition={Transitions.FadeIn} />
      <OpenModalButton title="Открыть с анимацией FadeInWithScale" transition={Transitions.FadeInWithScale} />
      <OpenModalButton title="Открыть с анимацией Scale" transition={Transitions.Scale} />
      <OpenModalButton title="Открыть без анимации" transition={Transitions.NoTransition} noBackdrop />
      <div className={styles.note}>
        Контролы storybook могут перекрывать модал, в обычном приложении модал не будет перекрываться другими
        элементами.
      </div>
    </>
  )
}
