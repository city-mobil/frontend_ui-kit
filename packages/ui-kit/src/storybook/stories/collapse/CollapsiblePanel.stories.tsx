import React, { useCallback, useState } from 'react'
import { CollapsiblePanel, CollapsiblePanelProps } from '../../../components/Collapsible'
import { Checkbox } from '../../../components/Checkbox'
import styles from './CollapsiblePanel.module.scss'

const loremIpsum = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
  in culpa qui officia deserunt mollit anim id est laborum.
`

export default {
  title: 'Collapsible/CollapsiblePanel',
  component: CollapsiblePanel,
}

export const PrimaryStory = (props: CollapsiblePanelProps) => {
  const [isOpen, setIsOpen] = useState(props.open)
  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [])
  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <div className="mt-10">
      <CollapsiblePanel
        {...props}
        header={<div className={styles.header}>CollapsiblePanel header text</div>}
        headerHeight={72}
        body={<div className="p-12">{loremIpsum.substr(0, 42)}</div>}
        onOpen={onOpen}
        onClose={onClose}
        open={isOpen}
      />
    </div>
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

export const Uncontrolled = () => {
  return (
    <>
      <div className="mt-10">
        <CollapsiblePanel
          header={<div className={styles.header}>CollapsiblePanel with small body </div>}
          headerHeight={72}
          body={<div className="p-12">{loremIpsum.substr(0, 42)}</div>}
        />
      </div>
      <div className="mt-10">
        <CollapsiblePanel
          header={<div className={styles.header}>CollapsiblePanel with big body </div>}
          headerHeight={72}
          body={<div className="p-12">{loremIpsum.repeat(5)}</div>}
        />
      </div>
    </>
  )
}

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [])
  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])
  const [checked, setChecked] = useState(false)
  const onChange = (checked: boolean) => {
    setChecked(checked)
    setIsOpen(checked)
  }

  return (
    <>
      <div className="mt-10">
        <CollapsiblePanel
          header={
            <div className={styles.header}>
              <Checkbox checked={checked} onChange={onChange} label={'Change open state'} className={styles.checkbox} />
            </div>
          }
          headerHeight={72}
          body={<div className="p-12">{loremIpsum.repeat(5)}</div>}
          open={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      </div>
    </>
  )
}
