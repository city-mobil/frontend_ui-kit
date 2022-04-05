import React from 'react'
import { Loader, LoaderProps } from '../../../components/Loader'

export default {
  title: 'Loaders/Loader',
  component: Loader,
  parameters: {
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: 600,
      },
    },
  },
}

export const PrimaryStory = (props: LoaderProps) => {
  return (
    <>
      <Loader {...props} />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur delectus earum, esse, eum id iure nemo
      officia optio provident quisquam ratione recusandae reiciendis rerum sapiente sint suscipit ullam velit.
    </>
  )
}

const primaryStoryDescription = `
Fullscreen loader.
`

PrimaryStory.parameters = {
  docs: {
    description: {
      component: primaryStoryDescription,
    },
  },
}

export const WithLongContent = () => {
  return (
    <>
      <Loader />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consectetur delectus earum, esse, eum id iure nemo
      officia optio provident quisquam ratione recusandae reiciendis rerum sapiente sint suscipit ullam velit. Lorem
      ipsum dolor sit amet, consectetur adipisicing elit. Animi cupiditate dolor ea expedita explicabo fuga maxime
      molestias mollitia neque quam quasi sequi soluta, totam, voluptate voluptatum! Amet consequatur esse quibusdam.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cupiditate dolor ea expedita explicabo fuga maxime
      molestias mollitia neque quam quasi sequi soluta, totam, voluptate voluptatum! Amet consequatur esse quibusdam.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cupiditate dolor ea expedita explicabo fuga maxime
      molestias mollitia neque quam quasi sequi soluta, totam, voluptate voluptatum! Amet consequatur esse quibusdam.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cupiditate dolor ea expedita explicabo fuga maxime
      molestias mollitia neque quam quasi sequi soluta, totam, voluptate voluptatum! Amet consequatur esse quibusdam.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cupiditate dolor ea expedita explicabo fuga maxime
      molestias mollitia neque quam quasi sequi soluta, totam, voluptate voluptatum! Amet consequatur esse quibusdam.
    </>
  )
}
