import React, { forwardRef, PropsWithChildren, useMemo, useCallback, useState, useEffect } from 'react'
import { Select, SelectBaseOption, SelectDefaults, SelectItemProps, SelectProps } from '../../../components/Selects'
import { ReactComponent as DownloadIcon } from '../../../assets/svg/ic-download.svg'
import { Button } from '../../../components/Buttons'
import { useSelectContext } from '../../../components/Selects'
import styles from './styles.module.scss'

type SpacerProps = PropsWithChildren<{ marginBottom: string }>

const Spacer = ({ marginBottom, children }: SpacerProps) => <div style={{ marginBottom, marginTop: 20 }}>{children}</div>

const defaultOptions: SelectBaseOption[] = [
  { value: 'test', label: 'test' },
  { value: 'test1', label: 'test1' },
  { value: 'test2', label: 'test2' },
  { value: 'test3', label: 'something' },
]

export default {
  title: 'Selects/Select',
  component: Select,
}

export const PrimaryStory = (props: SelectProps): JSX.Element => {
  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption | null>(null)
  const handleChange = useCallback(
    (option: SelectBaseOption | null) => {
      setCurrentOptionValue(option)
    },
    [setCurrentOptionValue],
  )
  const { onChange, value, options, placeholder = 'Hello world', ...rest } = props

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <Select
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

export const CustomizationViaProps = (): JSX.Element => {
  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption | null>(null)
  const onChange = useCallback(
    (option: SelectBaseOption | null) => {
      setCurrentOptionValue(option)
    },
    [setCurrentOptionValue],
  )

  const popupProps = useMemo(() => ({ className: styles.customPopup, arrow: true }), [])
  const targetProps = useMemo(() => ({ 'data-smth-for-tests': 'select_target' }), [])
  const itemProps = useMemo(() => ({ className: styles.customItem }), [])
  const noOptionsProps = useMemo(() => ({ className: styles.customNoOptions }), [])
  const loadingProps = useMemo(() => ({ className: styles.customLoading, id: 'id_for_getById' }), [])

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <Select
          onChange={onChange}
          value={currentOptionValue}
          options={defaultOptions}
          rootId="root_CustomizationViaProps"
          placeholder="Customization via props"
          className={styles.selectCustomTarget}
          popupProps={popupProps}
          targetProps={targetProps}
          itemProps={itemProps}
          noOptionsProps={noOptionsProps}
          loadingProps={loadingProps}
        />
      </Spacer>
      <div id="root_CustomizationViaProps" />
    </>
  )
}

// ---------------------------

export const CustomItems = (): JSX.Element => {
  const CustomItem = (props: SelectItemProps): JSX.Element => {
    const { option } = props

    return (
      <SelectDefaults.Item option={option}>
        <DownloadIcon />
        <span style={{ marginLeft: 4 }}>{option.label}</span>
      </SelectDefaults.Item>
    )
  }

  const components = useMemo(() => ({ SelectItem: CustomItem }), [])

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
        <Select
          onChange={onChange}
          value={currentOptionValue}
          options={defaultOptions}
          components={components}
          rootId="root1"
          placeholder="With icons"
        />
      </Spacer>
      <div id="root1" />
    </>
  )
}

// -------------------------

export const ButtonSelect = (): JSX.Element => {
  type IsContextMulty = false
  const CustomTarget = forwardRef<HTMLButtonElement, Record<string, unknown>>((_, ref) => {
    const { commonProps, targetProps } = useSelectContext<IsContextMulty>()
    const { targetId } = targetProps
    const { selectedValue } = commonProps

    return (
      <Button ref={ref} id={targetId}>
        {selectedValue?.label || 'Flat select'}
      </Button>
    )
  })

  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption | null>(null)
  const onChange = useCallback(
    (option: SelectBaseOption | null) => {
      setCurrentOptionValue(option)
    },
    [setCurrentOptionValue],
  )

  const components = useMemo(() => ({ Target: CustomTarget }), [])

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <Select
          onChange={onChange}
          value={currentOptionValue}
          options={defaultOptions}
          components={components}
          rootId="root2"
        />
      </Spacer>
      <div id="root2" />
    </>
  )
}

// ----------------------------

export const CustomNoOptions = (): JSX.Element => {
  const CustomNoOptions = (): JSX.Element => {
    return (
      <h3 style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        У ТЕБЯ НЕТ ВЫБОРА!
      </h3>
    )
  }

  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption | null>(null)
  const onChange = useCallback(
    (option: SelectBaseOption | null) => {
      setCurrentOptionValue(option)
    },
    [setCurrentOptionValue],
  )

  const components = useMemo(() => ({ NoOptions: CustomNoOptions }), [])

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <Select
          onChange={onChange}
          value={currentOptionValue}
          options={[]}
          components={components}
          rootId="root3"
          placeholder="Попробуй что-нибудь выбрать"
        />
      </Spacer>
      <div id="root3" />
    </>
  )
}

// ----------------------------

export const CustomLoading = (): JSX.Element => {
  const CustomLoading = (): JSX.Element => {
    return (
      <h3 style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Думаю......
      </h3>
    )
  }

  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption | null>(null)
  const onChange = useCallback(
    (option: SelectBaseOption | null) => {
      setCurrentOptionValue(option)
    },
    [setCurrentOptionValue],
  )

  const components = useMemo(() => ({ Loading: CustomLoading }), [])

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <Select
          onChange={onChange}
          value={currentOptionValue}
          options={[]}
          components={components}
          loading
          placeholder="Custom loading"
          rootId="root4"
        />
      </Spacer>
      <div id="root4" />
    </>
  )
}

// ------------------
export const CustomViaChildren = (): JSX.Element => {
  const alwaysPersistOptions: SelectBaseOption[] = [
    { value: 'test4', label: 'I am always here' },
    { value: 'test5', label: 'Me too!' },
  ]

  const Body = () => {
    const { commonProps } = useSelectContext()
    const { filter, searchValue } = commonProps

    const filteredOptions = filter(defaultOptions, searchValue)

    return (
      <div style={{ backgroundColor: 'lavender' }}>
        {filteredOptions.map((op) => (
          <SelectDefaults.Item key={op.value} option={op} />
        ))}
        <div style={{ borderTop: '1px solid red' }}>Нефильтруемые опции</div>
        {alwaysPersistOptions.map((op) => (
          <SelectDefaults.Item key={op.value} option={op} />
        ))}
      </div>
    )
  }

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
        <Select onChange={onChange} value={currentOptionValue} rootId="root5" placeholder="Ну полный кастом" searchable>
          <Body />
        </Select>
      </Spacer>
      <div id="root5" />
    </>
  )
}

// -------------------------

export const PartialAddition = (): JSX.Element => {
  const Item = (props: SelectItemProps) => {
    type IsContextMulty = false
    const { option } = props
    const { commonProps } = useSelectContext<IsContextMulty, SelectBaseOption, HTMLInputElement>()
    const { onChange, updateSearchValue, targetRef } = commonProps

    const handlePartialAddition = (e: React.MouseEvent) => {
      e.stopPropagation()

      updateSearchValue('tes')

      if (!targetRef.current) return

      targetRef.current.focus()
    }

    return (
      <div
        onClick={() => onChange(option)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 16, height: 40 }}
      >
        {option.label}
        <Button onClick={handlePartialAddition} size="xs">
          Add 'tes' to search
        </Button>
      </div>
    )
  }

  const PartialAdditionBody = () => {
    const { commonProps } = useSelectContext()
    const { filter, searchValue } = commonProps

    const filteredOptions = filter(defaultOptions, searchValue)

    return (
      <div style={{ backgroundColor: 'lavender' }}>
        {filteredOptions.map((op) => (
          <Item key={op.value} option={op} />
        ))}
      </div>
    )
  }

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
        <Select
          onChange={onChange}
          value={currentOptionValue}
          rootId="root6"
          placeholder="Частичное дозаполнение"
          searchable
        >
          <PartialAdditionBody />
        </Select>
      </Spacer>
      <div id="root6" />
    </>
  )
}

// ---------------------------

export const Suggest = (): JSX.Element => {
  const getOptions = async (): Promise<SelectBaseOption[]> => {
    const promise = new Promise<SelectBaseOption[]>((resolve) => {
      setTimeout(() => resolve(defaultOptions), 3000)
    })

    return promise
  }

  const [isLoading, setIsLoading] = useState(true)
  const [options, setOptions] = useState<SelectBaseOption[]>([])

  useEffect(() => {
    void getOptions().then((res) => {
      setOptions(res)
      setIsLoading(false)
    })
  }, [])

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
        <Select
          onChange={onChange}
          value={currentOptionValue}
          options={options}
          loading={isLoading}
          rootId="root7"
          placeholder="Suggest"
        />
      </Spacer>
      <div id="root7" />
    </>
  )
}