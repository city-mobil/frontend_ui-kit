import React from 'react'
import { themes } from '@city/ui-kit-core'
import { UIKitProvider } from '../src'
import 'normalize.css'
import '../src/index.css'
import '@city/ui-kit-core/dist/index.css'

const withUIKitProvider = (Story, context) => {
  return (
    <UIKitProvider initialTheme={context.globals.theme}>
      <Story {...context} />
    </UIKitProvider>
  )
}

export const decorators = [withUIKitProvider]

export const parameters = {
  viewMode: 'docs',
  controls: { expanded: true },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Installation', ['Installation ui-kit', 'Use modals', 'Contribution']],
      locales: 'en-US',
    },
  },
}

const themesNames = Object.keys(themes)

export const globalTypes = {
  theme: {
    name: 'Choose Theme',
    description: 'Global theme for components',
    defaultValue: themesNames[0],
    toolbar: {
      icon: 'star',
      items: themesNames,
    },
  }
}
