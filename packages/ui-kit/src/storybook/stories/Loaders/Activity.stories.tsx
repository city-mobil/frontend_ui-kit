import React from 'react'
import { Activity, ActivityProps } from '../../../components/Activity'

export default {
  title: 'Loaders/Activity',
  component: Activity,
}

export const PrimaryStory = (props: ActivityProps) => <Activity {...props} />

const primaryStoryDescription = `
Loader with controlled size.

### When to use
* If you need inline loader.
`

PrimaryStory.parameters = {
  docs: {
    description: {
      component: primaryStoryDescription,
    },
  },
}

export const StatesPreview = () => {
  return (
    <>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur dignissimos dolorem ex, facere
      fugiat in libero nam, nobis numquam odio quis, repellat sapiente vitae voluptate. Doloribus facilis mollitia
      quaerat!
      <Activity />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aspernatur consequuntur distinctio eius eos
      esse fugiat fugit hic in iusto laboriosam minima minus perspiciatis provident quos saepe vitae voluptas
      voluptatum.
    </>
  )
}
