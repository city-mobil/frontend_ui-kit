import React from 'react'
import { Collapsible, CollapsibleProps } from '../../../components/Collapsible'

const loremIpsum = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
  in culpa qui officia deserunt mollit anim id est laborum.
`

export default {
  title: 'Collapsible/Collapsible',
  component: Collapsible,
}

export const PrimaryStory = (props: CollapsibleProps) => {
  return (
    <>
      <div className="mt-10">
        <Collapsible
          {...props}
          header={<div className="p-12">Collapsible header text</div>}
          headerHeight={72}
          body={<div className="p-12">{loremIpsum.substr(0, 42)}</div>}
        />
      </div>
    </>
  )
}

PrimaryStory.argTypes = {
  header: {
    control: null,
  },
  body: {
    control: null,
  },
  headerHeight: {
    control: null,
  },
}

export const StatesPreview = () => {
  return (
    <>
      <div className="mt-10">
        <Collapsible
          header={<div className="p-12">Collapsible with small body </div>}
          headerHeight={72}
          body={<div className="p-12">{loremIpsum.substr(0, 42)}</div>}
        />
      </div>
      <div className="mt-10">
        <Collapsible
          header={<div className="p-12">Collapsible with big body </div>}
          headerHeight={72}
          body={<div className="p-12">{loremIpsum.repeat(5)}</div>}
        />
      </div>
    </>
  )
}
