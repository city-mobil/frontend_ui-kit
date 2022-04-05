import { Button, ButtonProps } from '../../../../components/Buttons'
import React from 'react'

export default {
  title: 'Buttons/Button',
  component: Button,
}

export const PrimaryStory = (props: ButtonProps): JSX.Element => <Button {...props}>I am Button</Button>

export const AsLink = (): JSX.Element => {
  return <Button href="https://city-mobil.ru/">Becomes anchor tag if href is provided</Button>
}

export const StatesPreview = (): JSX.Element => {
  return (
    <div className="mt-10">
      <div className="mt-32">
        <Button className="mr-16" variant={'primary'} size={'xs'}>
          Primary
        </Button>
        <Button className="mr-16" variant={'primary'} size={'sm'}>
          Primary
        </Button>
        <Button className="mr-16" variant={'primary'} size={'md'}>
          Primary
        </Button>
        <Button className="mr-16" variant={'primary'} size={'lg'}>
          <div>Hello</div>
          <div>world</div>
        </Button>
      </div>
      <div className="mt-12">
        <Button className="mr-16" disabled variant={'primary'} size={'xs'}>
          Primary
        </Button>
        <Button className="mr-16" disabled variant={'primary'} size={'sm'}>
          Primary
        </Button>
        <Button className="mr-16" disabled variant={'primary'} size={'md'}>
          Primary
        </Button>
        <Button className="mr-16" disabled variant={'primary'} size={'lg'}>
          <div>Hello</div>
          <div>world</div>
        </Button>
      </div>
      <div className="mt-12">
        <Button className="mr-16" loading variant={'primary'} size={'xs'}>
          Primary
        </Button>
        <Button className="mr-16" loading variant={'primary'} size={'sm'}>
          Primary
        </Button>
        <Button className="mr-16" loading variant={'primary'} size={'md'}>
          Primary
        </Button>
        <Button className="mr-16" loading variant={'primary'} size={'lg'}>
          <div>Hello</div>
          <div>world</div>
        </Button>
      </div>
      <div className="mt-32">
        <Button className="mr-16" variant={'secondary'} size={'xs'}>
          Secondary
        </Button>
        <Button className="mr-16" variant={'secondary'} size={'sm'}>
          Secondary
        </Button>
        <Button className="mr-16" variant={'secondary'} size={'md'}>
          Secondary
        </Button>
        <Button className="mr-16" variant={'secondary'} size={'lg'}>
          <div>Hello</div>
          <div>world</div>
        </Button>
      </div>
      <div className="mt-12">
        <Button className="mr-16" disabled variant={'secondary'} size={'xs'}>
          Secondary
        </Button>
        <Button className="mr-16" disabled variant={'secondary'} size={'sm'}>
          Secondary
        </Button>
        <Button className="mr-16" disabled variant={'secondary'} size={'md'}>
          Secondary
        </Button>
        <Button className="mr-16" disabled variant={'secondary'} size={'lg'}>
          <div>Hello</div>
          <div>world</div>
        </Button>
      </div>
      <div className="mt-12">
        <Button className="mr-16" loading variant={'secondary'} size={'xs'}>
          Secondary
        </Button>
        <Button className="mr-16" loading variant={'secondary'} size={'sm'}>
          Secondary
        </Button>
        <Button className="mr-16" loading variant={'secondary'} size={'md'}>
          Secondary
        </Button>
        <Button className="mr-16" loading variant={'secondary'} size={'lg'}>
          <div>Hello</div>
          <div>world</div>
        </Button>
      </div>
      <div className="mt-32">
        <Button className="mr-16" variant={'flat'} size={'xs'}>
          Flat
        </Button>
        <Button className="mr-16" variant={'flat'} size={'sm'}>
          Flat
        </Button>
        <Button className="mr-16" variant={'flat'} size={'md'}>
          Flat
        </Button>
        <Button className="mr-16" variant={'flat'} size={'lg'}>
          <div>Hello</div>
          <div>world</div>
        </Button>
      </div>
      <div className="mt-12">
        <Button className="mr-16" disabled variant={'flat'} size={'xs'}>
          Flat
        </Button>
        <Button className="mr-16" disabled variant={'flat'} size={'sm'}>
          Flat
        </Button>
        <Button className="mr-16" disabled variant={'flat'} size={'md'}>
          Flat
        </Button>
        <Button className="mr-16" disabled variant={'flat'} size={'lg'}>
          <div>Hello</div>
          <div>world</div>
        </Button>
      </div>{' '}
      <div className="mt-12">
        <Button className="mr-16" loading variant={'flat'} size={'xs'}>
          Flat
        </Button>
        <Button className="mr-16" loading variant={'flat'} size={'sm'}>
          Flat
        </Button>
        <Button className="mr-16" loading variant={'flat'} size={'md'}>
          Flat
        </Button>
        <Button className="mr-16" loading variant={'flat'} size={'lg'}>
          <div>Hello</div>
          <div>world</div>
        </Button>
      </div>
    </div>
  )
}
