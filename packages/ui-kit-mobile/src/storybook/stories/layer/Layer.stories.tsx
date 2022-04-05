import { withKnobs } from '@storybook/addon-knobs'
import { Meta, Story } from '@storybook/react'
import React, { FC, HTMLAttributes } from 'react'

import { Layer, LayerProps } from '../../../components/Layer'
import styles from './styles.module.scss'

const loremIpsum = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
  in culpa qui officia deserunt mollit anim id est laborum.
`

export default {
  component: Layer,
  title: 'Layer / Examples',
  decorators: [withKnobs],
  args: {
    opened: true,
    wheelEnabled: false,
  },
} as Meta

const Card: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
  <div className={styles.card} {...props}>
    <div className={styles.draggerWrapper}>
      <div className={styles.dragger} />
    </div>
    {props.children}
  </div>
)
const Placeholder: FC = (props) => <div className={styles.placeholder} {...props} />

const ContentTop: FC = () => (
  <div className={styles.contentTopWrapper}>Здесь может быть что угодно. Например, кнопки.</div>
)

const Content: FC = () => (
  <Card>
    <div>{loremIpsum}</div>
    <Placeholder />
    <div>{loremIpsum}</div>
    <Placeholder />
    <div>{loremIpsum}</div>
  </Card>
)

export const Base: Story<LayerProps> = (props) => {
  return (
    <Layer {...props}>
      <Content />
    </Layer>
  )
}

Base.args = {
  dismissible: true,
  disabled: false,
  overScroll: true,
}

export const WithInitialPosition: Story<LayerProps> = (props) => {
  return (
    <Layer {...props}>
      <Content />
    </Layer>
  )
}

WithInitialPosition.args = {
  initialPosition: 200,
}

export const WithContentTop: Story<LayerProps> = (props) => {
  return (
    <Layer contentTop={<ContentTop />} {...props}>
      <Content />
    </Layer>
  )
}

WithContentTop.args = {
  fixedTop: true,
  initialPosition: 200,
}

export const WithOverScroll: Story<LayerProps> = (props) => {
  const { overscrollHeight = 0 } = props

  return (
    <Layer {...props}>
      <Card style={{ paddingBottom: overscrollHeight + 8 }}>
        <div>{loremIpsum}</div>
        <Placeholder />
        <div>{loremIpsum}</div>
      </Card>
    </Layer>
  )
}

WithOverScroll.args = {
  overScroll: true,
  overscrollHeight: 1000,
}
