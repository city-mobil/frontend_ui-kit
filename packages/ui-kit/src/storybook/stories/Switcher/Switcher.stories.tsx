import React from 'react'
import styles from './Switcher.module.scss'

import { SwitcherProps, Switcher } from '../../../components/Switcher'
import { Size } from '../../../types'

export default {
  title: 'Checkboxes/Switcher',
  component: Switcher,
  argTypes: {
    onChange: {
      description: 'Function that is called when switcher is clicked and not disabled.',
    },
  },
}

export const PrimaryStory = (args: SwitcherProps) => <Switcher {...args} />

const primaryStoryDescription = `
Switching Selector.

### When to use
* If you need to represent the switching between two states or on-off state.
`
PrimaryStory.parameters = {
  docs: {
    description: {
      component: primaryStoryDescription,
    },
  },
}

const sizes: Array<Exclude<Size, 'xs'>> = ['sm', 'md', 'lg']

export const Demo = () => (
  <div className={styles.container}>
    {sizes.map((size) => (
      <Switcher key={size} size={size} onChange={(_checked: boolean) => {}} />
    ))}
    {sizes.map((size, index) => (
      <Switcher checked={index % 2 === 1} key={size} disabled size={size} onChange={(_checked: boolean) => {}} />
    ))}
  </div>
)

