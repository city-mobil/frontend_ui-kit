import React, { useEffect, useState } from 'react'
import { PopperElementType, PopperWrapper, PopperWrapperProps, Portal, Typography } from '@city/ui-kit-core'
import { ReactComponent as DownloadIcon } from '../../../assets/svg/ic-download.svg'
import { IconButton } from '../../../components/Buttons/IconButton/IconButton'
import { Button } from '../../../components/Buttons/Button'
import { VirtualElement } from '@popperjs/core'
import styles from './styles.module.scss'

export default {
  title: 'Overlays/PopperWrapper',
  component: PopperWrapper,
}

export const PrimaryStory = () => {
  const targetId = 'primary'
  const [referenceElement, setReferenceElement] = useState<PopperElementType | VirtualElement>(null)
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const target = document.getElementById(targetId)

    if (!target) return

    setReferenceElement(target)
  }, [targetId])

  const toggle = () => {
    setIsShow((cur) => !cur)
  }

  return (
    <>
      <div className={styles.container}>
        <IconButton icon={DownloadIcon} id="primary" />
        <Portal>
          <PopperWrapper
            referenceElement={referenceElement}
            popoverClassName={styles.custom}
            isRendered
            isShow={isShow}
          >
            <Typography.H6 colorName="accent700">
              Самый низкоуровневый компонент. Отвечает за логику позиционирования относительно{' '}
              <code>referenceElement</code>.
            </Typography.H6>
            <br />
            <Typography.P13>
              Используйте этот компонент, если вам НЕ подходят механизмы показа/скрытия компонента <code>Overlay</code>.
            </Typography.P13>
            <Typography.P13>
              Предпочтительно использование вместе с компонентом <code>Portal</code>.
            </Typography.P13>
            <br />
            <Typography.P12 colorName="secondaryText">
              Таблицы пропсов нет, из-за технических ограничений Storybook, тк компонент импортирован из
              @city/ui-kit-core
            </Typography.P12>
          </PopperWrapper>
        </Portal>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button onClick={toggle}>Toggle</Button>
      </div>
    </>
  )
}

const primaryStoryDescription = `
Самый низкоуровневый компонент. Отвечает за логику позиционирования относительно referenceElement

### Когда использовать
* Используйте этот компонент, если вам НЕ подходят механизмы показа/скрытия компонента Overlay. Предпочтительно использование вместе с компонентом Portal.

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
