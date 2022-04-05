import React, { forwardRef, PropsWithChildren, useMemo, useCallback, useState } from 'react'
import { SelectBaseOption, SelectProps, FlatSelect, FlatSelectDefaults } from '../../../components/Selects'
import styles from './styles.module.scss'

type SpacerProps = PropsWithChildren<{ marginBottom: string; center?: boolean }>

const Spacer = ({ marginBottom, children }: SpacerProps) => (
  <div style={{ marginBottom, marginTop: 20 }}>{children}</div>
)

const defaultOptions: SelectBaseOption[] = [
  { value: 'test', label: 'test' },
  { value: 'test1', label: 'test1' },
  { value: 'test2', label: 'test2' },
]

export default {
  title: 'Selects/FlatSelect',
  component: FlatSelect,
}

export const PrimaryStory = (props: SelectProps<SelectBaseOption, HTMLButtonElement>): JSX.Element => {
  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption | null>(null)
  const handleChange = useCallback(
    (option: SelectBaseOption | null) => {
      setCurrentOptionValue(option)
    },
    [setCurrentOptionValue],
  )
  const { onChange, value, options, placeholder = 'Выберете значение...', ...rest } = props

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <FlatSelect
          onChange={handleChange}
          value={currentOptionValue}
          options={defaultOptions}
          placeholder={placeholder}
          {...rest}
        />
      </Spacer>
    </>
  )
}

PrimaryStory.argTypes = {
  value: {
    table: {
      type: { summary: 'T | null' },
    },
  },
  clearable: {
    table: {
      defaultValue: { summary: 'false' },
    },
  },
  loading: {
    table: {
      defaultValue: { summary: 'false' },
    },
  },
  disabled: {
    table: {
      defaultValue: { summary: 'false' },
    },
  },
  searchable: {
    table: {
      defaultValue: { summary: 'false' },
    },
  },
  errorTooltipAutoshow: {
    description:
      'If <b>true</b>, error tooltip will be shown for 3sec after errorTooltipText is changed.<br />If <b>false</b> - tooltip will be shown as long as errorTooltipText is not empty',
    table: {
      defaultValue: { summary: 'true' },
    },
  },
  errorBorder: {
    description: 'Ignored if errorTooltipText is provided',
    table: {
      defaultValue: { summary: 'true' },
    },
  },
  size: {
    table: {
      defaultValue: { summary: 'sm' },
    },
  },
  rootId: {
    table: {
      disable: true,
    },
  },
}

// ---------------------------

export const Customization = (): JSX.Element => {
  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption | null>(null)
  const onChange = useCallback(
    (option: SelectBaseOption | null) => {
      setCurrentOptionValue(option)
    },
    [setCurrentOptionValue],
  )

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <FlatSelect
          onChange={onChange}
          value={currentOptionValue}
          options={defaultOptions}
          rootId="root1"
          placeholder="Кастомизация через className"
          className={styles.flatSelectCustomTarget}
        />
      </Spacer>
      <div id="root1" />
    </>
  )
}
