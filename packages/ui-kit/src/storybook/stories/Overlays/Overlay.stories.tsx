import React, { useCallback, useEffect, useRef, useState } from 'react'
import { PopperElementType, Overlay, OverlayProps, OverlayRef, Typography, useVirtualElement } from '@city/ui-kit-core'
import { ReactComponent as DownloadIcon } from '../../../assets/svg/ic-download.svg'
import { IconButton } from '../../../components/Buttons/IconButton/IconButton'
import { VirtualElement } from '@popperjs/core'
import styles from './styles.module.scss'

export default {
  title: 'Overlays/Overlay',
  component: Overlay,
}

export const PrimaryStory = (props: OverlayProps) => {
  const { referenceElement: propsReferenceElement, trigger = 'hover', popoverClassName, ...rest } = props
  const targetId = 'primary'
  const [referenceElement, setReferenceElement] = useState<PopperElementType | VirtualElement>(null)

  useEffect(() => {
    const target = document.getElementById(targetId)

    if (!target) return

    setReferenceElement(target)
  }, [targetId])

  return (
    <>
      <div className={styles.container}>
        <IconButton icon={DownloadIcon} id="primary" />
        <Overlay referenceElement={referenceElement} popoverClassName={styles.custom} trigger={trigger} {...rest}>
          <Typography.H6 colorName="accent700">
            Более низкоуровневый, чем Tooltip и Popover компонент без предустановленных стилей. Отвечает за логику
            показа/скрытия.
          </Typography.H6>
          <br />
          <Typography.P13>Используйте этот компонент, если вам подходят механизмы показа/скрытия,</Typography.P13>
          <Typography.P13>
            но не подходят предустановленные стили компонентов <code>Tooltip</code> и <code>Popover</code>
          </Typography.P13>
          <br />
          <Typography.P12 colorName="secondaryText">
            Таблицы пропсов нет, из-за технических ограничений Storybook, тк компонент импортирован из @city/ui-kit-core
          </Typography.P12>
        </Overlay>
      </div>
    </>
  )
}

const primaryStoryDescription = `
Более низкоуровневый, чем Tooltip и Popover компонент без предустановленных стилей. Отвечает за логику показа/скрытия.

### Когда использовать
* Используйте этот компонент, если вам подходят механизмы показа/скрытия, но не подходят предустановленные стили компонентов Tooltip и Popover.

Может быть поднят по наведению, по клику или программно. Всегда поднимается при фокусе на target element.

Таблицы пропсов нет, из-за технических ограничений Storybook, тк компонент импортирован из @city/ui-kit-core
`
PrimaryStory.parameters = {
  docs: {
    description: {
      component: primaryStoryDescription,
    },
  },
}

PrimaryStory.argTypes = {
  referenceElement: {
    control: null,
  },
}

export const VirtualTarget = (): JSX.Element => {
  const overlayRef = useRef<OverlayRef>(null)
  const { virtualElement, updateVirtualElement } = useVirtualElement(overlayRef)

  const handleMouseMove = useCallback(({ clientX: x, clientY: y }: MouseEvent) => {
    updateVirtualElement(x, y)
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '120px 0' }}>
        <Overlay
          referenceElement={virtualElement.current}
          popoverClassName={styles.custom}
          placement="top"
          showOnLoad
          rootId="root2"
          ref={overlayRef}
          trigger="hover"
        >
          <div>
            <Typography.H6 colorName="accent700">APPL</Typography.H6>
            <Typography.P12 colorName="secondaryText">30.10.2021</Typography.P12>
            <Typography.P13>Open: 148,5$</Typography.P13>
            <Typography.P13>Close: 149,8$</Typography.P13>
            <Typography.P13>Max: 149,94$</Typography.P13>
            <Typography.P13>Min: 146,42$</Typography.P13>
          </div>
        </Overlay>
      </div>
      <div id="root2" />
    </div>
  )
}
