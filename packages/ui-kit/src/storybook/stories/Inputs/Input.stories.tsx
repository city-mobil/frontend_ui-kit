import React, { useState, ReactNode } from 'react'
import { InputProps, Input } from '../../../components/Input'
import { ReactComponent as CalendarIcon } from '../../../assets/svg/ic_calendar.svg'
import { ReactComponent as DownloadIcon } from '../../../assets/svg/ic-download.svg'

export default {
  title: 'Inputs/Input',
  component: Input,
}

const Container = ({ children }: { children: ReactNode }): JSX.Element => {
  return <div style={{ marginTop: 30 }}>{children}</div>
}

export const PrimaryStory = (props: InputProps): JSX.Element => {
  const [value, setValue] = useState('')

  return (
    <Container>
      <Input {...props} onChange={(v) => setValue(v)} value={props.value || value} />
    </Container>
  )
}

PrimaryStory.argTypes = {
  suffixIcon: {
    description: 'Icon should be 16x16 px',
    control: null,
  },
  prefixIcon: {
    description: 'Icon should be 16x16 px',
    control: null,
  },
  errorTooltipText: {
    description: 'Tooltip is always hidden on scroll, technical limitation',
  },
  autoShowErrorTooltip: {
    description:
      'If <b>true</b>, error tooltip will be shown for 3sec after errorTooltipText is changed.<br />If <b>false</b> - tooltip will be shown as long as errorTooltipText is not empty',
    defaultValue: true,
  },
  erroredBorder: {
    description: 'Ignored if errorTooltipText is provided',
  },
  rootId: {
    table: {
      disable: true,
    },
  },
}

export const ClerableWithError = (): JSX.Element => {
  const [value, setValue] = useState('')

  return (
    <Container>
      <Input
        onChange={(v) => setValue(v)}
        value={value}
        errorTooltipText="This is error message"
        isClearable
        rootId="root1"
      />
      <div id="root1" />
    </Container>
  )
}

export const CustomIcons = (): JSX.Element => {
  const [value, setValue] = useState('')

  return (
    <Container>
      <Input
        onChange={(v) => setValue(v)}
        value={value}
        errorTooltipText={value ? '' : 'Field should not be empty'}
        isClearable
        prefixIcon={DownloadIcon}
        suffixIcon={CalendarIcon}
        onSuffixIconClick={() => alert('calendar clicked!')}
        rootId="root2"
      />
      <div id="root2" />
    </Container>
  )
}

export const Disabled = (): JSX.Element => {
  return <Input value="I am disabled" disabled />
}

export const FormInputWithAutoComplete = (): JSX.Element => {
  const [value, setValue] = useState('')

  return (
    <form>
      <Input
        onChange={setValue}
        value={value}
        name="name"
        prefixIcon={DownloadIcon}
        suffixIcon={CalendarIcon}
      />
    </form>
  )
}
