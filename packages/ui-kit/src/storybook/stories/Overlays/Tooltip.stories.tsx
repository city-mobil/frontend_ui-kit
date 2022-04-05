import React, { useCallback, useEffect, useRef } from 'react'
import { Tooltip, TooltipProps, TooltipPropsWithTargetId } from '../../../components/Tooltip'
import { ReactComponent as DownloadIcon } from '../../../assets/svg/ic-download.svg'
import { Button, IconButton } from '../../../components/Buttons'
import { OverlayRef, useVirtualElement } from '@city/ui-kit-core'
import styles from './styles.module.scss'

export default {
  title: 'Overlays/Tooltip',
  component: Tooltip,
}

export const PrimaryStory = (props: TooltipProps) => {
  const { targetId, ...rest } = props as TooltipPropsWithTargetId

  return (
    <>
      <div className={styles.container}>
        <IconButton icon={DownloadIcon} id="primary" />
        <Tooltip targetId="primary" {...rest}>
          <div>Уведомление с обычной подсказкой.</div>
          <br />
          <div>
            Используйте компонент <code>Tooltip</code>, чтобы предоставить пояснение для кнопки/текста/операции
          </div>
          <div>или чтобы сообщить об ошибке.</div>
          <br />
          <div>Может быть поднят по наведению (по умолчанию), по клику или программно.</div>
          <div>Всегда поднимается при фокусе на target element.</div>
          <br />
          <div>
            Имеет предустановленные стили, но их можно кастомизировать через <code>className</code>
          </div>
        </Tooltip>
      </div>
    </>
  )
}

const primaryStoryDescription = `
Уведомление с обычной подсказкой.

### Когда использовать
* Используйте компонент Tooltip, чтобы предоставить пояснение для кнопки/текста/операции или чтобы сообщить об ошибке.

Может быть поднят по наведению (по умолчанию), по клику или программно. Всегда поднимается при фокусе на target element.
Имеет предустановленные стили, но их можно кастомизировать через className
`
PrimaryStory.parameters = {
  docs: {
    description: {
      component: primaryStoryDescription,
    },
  },
}

PrimaryStory.argTypes = {
  targetId: {
    control: null,
    description: 'Предоставьте либо `targetId`, либо `virtualTarget`',
  },
  virtualTarget: {
    control: null,
    description: 'Предоставьте либо `targetId`, либо `virtualTarget`',
  },
}

export const Positions = (): JSX.Element => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
        <div>
          <IconButton icon={DownloadIcon} id="one" />
          <Tooltip targetId="one" placement="top" arrow rootId="root1">
            Уведомление с обычной подсказкой всплывает по наведению сверху от элемента
          </Tooltip>
        </div>
        <div>
          <IconButton icon={DownloadIcon} id="two" />
          <Tooltip targetId="two" placement="bottom" arrow type="error" rootId="root1">
            Уведомление с обычной подсказкой всплывает по наведению снизу от элемента
          </Tooltip>
        </div>
        <div>
          <IconButton icon={DownloadIcon} id="three" />
          <Tooltip targetId="three" placement="right" arrow rootId="root1">
            Уведомление с обычной подсказкой всплывает по наведению справа от элемента
          </Tooltip>
        </div>
        <div>
          <IconButton icon={DownloadIcon} id="four" />
          <Tooltip targetId="four" placement="left" arrow type="error" rootId="root1">
            Уведомление с обычной подсказкой всплывает по наведению слева от элемента
          </Tooltip>
        </div>
        <div>
          <IconButton icon={DownloadIcon} id="five" />
          <Tooltip targetId="five" placement="left" arrow rootId="root1">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton icon={DownloadIcon} onClick={() => alert('Hooray!')} />
              Какой угодно контент внутри
            </div>
          </Tooltip>
        </div>
      </div>
      <div id="root1" />
    </div>
  )
}

export const VirtualTarget = (): JSX.Element => {
  const tooltipRef = useRef<OverlayRef>(null)
  const { virtualElement, updateVirtualElement } = useVirtualElement(tooltipRef)

  const handleMouseMove = useCallback(({ clientX: x, clientY: y }: MouseEvent) => {
    updateVirtualElement(x, y)
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '100px 0' }}>
        <Tooltip
          virtualTarget={virtualElement.current}
          placement="top"
          arrow
          showOnLoad
          rootId="root2"
          ref={tooltipRef}
        >
          Тултип, привязанный к виртуальному эмеленту
        </Tooltip>
      </div>
      <div id="root2" />
    </div>
  )
}

export const ImperativeHandle = (): JSX.Element => {
  const tooltipRef = useRef<OverlayRef>(null)

  const handleClick = () => {
    tooltipRef.current?.show()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '100px 0' }}>
        <IconButton icon={DownloadIcon} id="six" />
        <Button onClick={handleClick}>SHOW TOOLTIP</Button>
        <Tooltip targetId="six" placement="top" arrow rootId="root3" ref={tooltipRef}>
          Тултип, поднятый програмно
        </Tooltip>
      </div>
      <div id="root3" />
    </div>
  )
}

export const DontCloseOnOutsideClick = (): JSX.Element => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '100px 0' }}>
        <IconButton icon={DownloadIcon} id="seven" />
        <Tooltip targetId="seven" placement="top" arrow rootId="root4" trigger="click" closeOnOutsideClick={false}>
          Тултип, не закрывающийся по клику во вне
        </Tooltip>
      </div>
      <div id="root4" />
    </div>
  )
}
