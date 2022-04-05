import React, { useCallback, useEffect, useRef, useState } from 'react'
import { OverlayRef, Typography, useVirtualElement } from '@city/ui-kit-core'
import { Popover, PopoverProps, PopoverPropsWithTargetId } from '../../../components/Popover'
import { ReactComponent as DownloadIcon } from '../../../assets/svg/ic-download.svg'
import { IconButton } from '../../../components/Buttons/IconButton/IconButton'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Buttons/Button'

export default {
  title: 'Overlays/Popover',
  component: Popover,
}

export const PrimaryStory = (props: PopoverProps) => {
  const { targetId, ...rest } = props as PopoverPropsWithTargetId

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '160px 0 20px' }}>
        <IconButton icon={DownloadIcon} id="primary" />
        <Popover targetId="primary" {...rest}>
          <div>Всплывающее меню для предоставления доп информации и операций.</div>
          <br />
          <div>
            Используйте <code>Popover</code> в случае, если помимо доп инфы предоставляются
          </div>
          <div>интерактивные элементы: инпуты, ссылки, кнопки и тд.</div>
          <br />
          <div>Может быть поднят по клику (по умолчанию), по наведению или программно.</div>
          <div>Всегда поднимается при фокусе на target element.</div>
          <br />
          <div>
            Имеет предустановленные стили, но их можно кастомизировать через <code>className</code>
          </div>
        </Popover>
      </div>
    </>
  )
}

const primaryStoryDescription = `
Всплывающее меню для предоставления доп информации и операций.

### Когда использовать
* Используйте Popover в случае, если помимо доп инфы предоставляются интерактивные элементы: инпуты, ссылки, кнопки и тд.

Может быть поднят по клику (по умолчанию), по наведению или программно. Всегда поднимается при фокусе на target element.
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

export const CustomContent = () => {
  const ref = useRef<OverlayRef>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const onClick = () => {
    ref.current?.hide()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '200px 20px 0' }}>
        <div>
          <IconButton icon={DownloadIcon} id="one" />
          <Popover targetId="one" ref={ref} rootId="root1">
            <div style={{ width: 336 }}>
              <Typography.H6 className="mb-16">Отправитель</Typography.H6>
              <Input placeholder="Имя" value={name} onChange={setName} className="mb-8" />
              <Input placeholder="Имя" value={phone} onChange={setPhone} className="mb-16" />
              <Button onClick={onClick}>Применить</Button>
            </div>
          </Popover>
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
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '120px 0' }}>
        <Popover
          virtualTarget={virtualElement.current}
          placement="top"
          arrow
          showOnLoad
          rootId="root2"
          ref={tooltipRef}
        >
          <div>
            <Typography.H6>APPL</Typography.H6>
            <Typography.P12 colorName="secondaryText">30.10.2021</Typography.P12>
            <Typography.P13>Open: 148,5$</Typography.P13>
            <Typography.P13>Close: 149,8$</Typography.P13>
            <Typography.P13>Max: 149,94$</Typography.P13>
            <Typography.P13>Min: 146,42$</Typography.P13>
          </div>
        </Popover>
      </div>
      <div id="root2" />
    </div>
  )
}

export const ImperativeHandle = (): JSX.Element => {
  const popoverRef = useRef<OverlayRef>(null)

  const handleClick = () => {
    popoverRef.current?.show()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '100px 0' }}>
        <IconButton icon={DownloadIcon} id="two" />
        <Button onClick={handleClick}>SHOW POPOVER</Button>
        <Popover targetId="two" placement="top" arrow rootId="root3" ref={popoverRef}>
          Popover, поднятый программно
        </Popover>
      </div>
      <div id="root3" />
    </div>
  )
}

export const DontcloseOnOutsideClick = (): JSX.Element => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '100px 0' }}>
        <IconButton icon={DownloadIcon} id="three" />
        <Popover targetId="three" placement="top" arrow rootId="root4" closeOnOutsideClick={false}>
          Popover, не закрвающийся по клику во вне
        </Popover>
      </div>
      <div id="root4" />
    </div>
  )
}
