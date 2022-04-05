import React, { forwardRef, PropsWithChildren, useMemo, useCallback, useState, useEffect } from 'react'
import { linkTo } from '@storybook/addon-links'
import {
  MultiselectDefaults,
  MultiselectItemProps,
  MultiselectProps,
  MultiselectTargetProps,
  SelectBaseOption,
  TagProps,
} from '../../../components/Selects'
import { ReactComponent as DownloadIcon } from '../../../assets/svg/ic-download.svg'
import { useSelectContext } from '../../../components/Selects/context'
import { Multiselect } from '../../../components/Selects/Multiselect'
import styles from './styles.module.scss'
import { Divider } from '../../../internal/components'

type SpacerProps = PropsWithChildren<{ marginBottom: string; width?: number }>

const Spacer = ({ marginBottom, width, children }: SpacerProps) => <div style={{ marginBottom, width }}>{children}</div>

const defaultOptions: SelectBaseOption[] = [
  { value: 0, label: 'test' },
  { value: 1, label: 'test1' },
  { value: 2, label: 'test2' },
  { value: 3, label: 'something' },
]

export default {
  title: 'Selects/Multiselect',
  component: Multiselect,
}

export const PrimaryStory = (props: MultiselectProps): JSX.Element => {
  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption[]>([])
  const handleChange = useCallback(
    (options: SelectBaseOption[]) => {
      setCurrentOptionValue(options)
    },
    [setCurrentOptionValue],
  )
  const { onChange, value, options, placeholder = 'Hello world', ...rest } = props

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <Multiselect
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
      type: { summary: 'T[]' },
    },
  },
  submittable: {
    table: {
      defaultValue: { summary: 'false' },
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

// -------------

export const CustomizationViaProps = (): JSX.Element => {
  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption[]>([])
  const handleChange = useCallback(
    (options: SelectBaseOption[]) => {
      setCurrentOptionValue(options)
    },
    [setCurrentOptionValue],
  )

  const popupProps = useMemo(() => ({ className: styles.customPopup, arrow: true }), [])
  const targetProps = useMemo(() => ({ 'data-smth-for-test': 'lalala' }), [])
  const itemProps = useMemo(() => ({ className: styles.customItem }), [])
  const noOptionsProps = useMemo(() => ({ className: styles.customNoOptions }), [])
  const loadingProps = useMemo(() => ({ className: styles.customLoading, id: 'id_for_getById' }), [])
  const tagProps = useMemo(() => ({ className: styles.customTag }), [])

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <Multiselect
          onChange={handleChange}
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
          tagProps={tagProps}
        />
      </Spacer>
      <div id="root_CustomizationViaProps" />
    </>
  )
}

// ---------------

export const Submitable = (): JSX.Element => {
  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption[]>([])
  const handleChange = useCallback(
    (options: SelectBaseOption[]) => {
      setCurrentOptionValue(options)
    },
    [setCurrentOptionValue],
  )

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <Multiselect
          onChange={handleChange}
          value={currentOptionValue}
          options={defaultOptions}
          submittable
          placeholder="Submitable"
          rootId="root1"
        />
      </Spacer>
      <div id="root1" />
    </>
  )
}

// ---------------

export const MultipleRows = (): JSX.Element => {
  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption[]>([])
  const handleChange = useCallback(
    (options: SelectBaseOption[]) => {
      setCurrentOptionValue(options)
    },
    [setCurrentOptionValue],
  )

  return (
    <>
      <Spacer marginBottom={'250px'} width={300}>
        <Multiselect
          onChange={handleChange}
          value={currentOptionValue}
          options={defaultOptions}
          size="lg"
          placeholder="Multiple rows"
          rootId="root2"
        />
      </Spacer>
      <div id="root2" />
    </>
  )
}

// ---------------

export const CustomItems = (): JSX.Element => {
  const CustomItem = (props: MultiselectItemProps): JSX.Element => {
    const { option, isSelected } = props

    return (
      <MultiselectDefaults.Item option={option} isSelected={isSelected}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <DownloadIcon />
          <span style={{ marginLeft: 4 }}>{option.label}</span>
        </div>
      </MultiselectDefaults.Item>
    )
  }

  const components = useMemo(() => ({ SelectItem: CustomItem }), [])

  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption[]>([])
  const handleChange = useCallback(
    (options: SelectBaseOption[]) => {
      setCurrentOptionValue(options)
    },
    [setCurrentOptionValue],
  )

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <Multiselect
          onChange={handleChange}
          value={currentOptionValue}
          options={defaultOptions}
          components={components}
          rootId="root3"
          placeholder="With icons"
        />
      </Spacer>
      <div id="root3" />
    </>
  )
}

// ------------

export const CustomTag = (): JSX.Element => {
  const colors = ['crimson', 'lavender', 'turquoise', 'whitesmoke']
  type IsSelectContexMulty = true

  // если размер мультиселекта < lg, то компонент Tag НЕ получает option в кач-ве пропа
  const MyTag = () => {
    const { commonProps } = useSelectContext<IsSelectContexMulty>()
    const { selectedValue } = commonProps

    return <div style={{ height: 22, backgroundColor: 'lavender' }}>Выбрано {selectedValue.length}</div>
  }

  // если размер мультиселекта == lg, то компонент Tag получает option в кач-ве пропа
  const MyTagLg = ({ option }: TagProps) => {
    return <div style={{ height: 22, backgroundColor: colors[Number(option?.value) || 0] }}>{option?.label}</div>
  }

  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption[]>([])
  const handleChange = useCallback(
    (options: SelectBaseOption[]) => {
      setCurrentOptionValue(options)
    },
    [setCurrentOptionValue],
  )

  const components = useMemo(() => ({ Tag: MyTag }), [])
  const componentsLg = useMemo(() => ({ Tag: MyTagLg }), [])

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <div>При кастомизации компонента Tag он получает различные пропсы при различных размерах мультиселекта</div>
        <div className={styles.tagCustomizationStorieContainer}>
          <Multiselect
            onChange={handleChange}
            value={currentOptionValue}
            options={defaultOptions}
            components={components}
            placeholder="Custom tag"
            size="xs"
            rootId="root4"
          />
          <Multiselect
            onChange={handleChange}
            value={currentOptionValue}
            options={defaultOptions}
            components={components}
            placeholder="Custom tag"
            size="sm"
            rootId="root4"
          />
          <Multiselect
            onChange={handleChange}
            value={currentOptionValue}
            options={defaultOptions}
            components={components}
            placeholder="Custom tag"
            size="md"
            rootId="root4"
          />
          <Multiselect
            onChange={handleChange}
            value={currentOptionValue}
            options={defaultOptions}
            components={componentsLg}
            placeholder="Custom tag"
            size="lg"
            rootId="root4"
          />
        </div>
      </Spacer>
      <div id="root4" />
    </>
  )
}

// --------------

export const CustomTarget = (): JSX.Element => {
  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption[]>([])
  const handleChange = useCallback(
    (options: SelectBaseOption[]) => {
      setCurrentOptionValue(options)
    },
    [setCurrentOptionValue],
  )

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <Multiselect
          onChange={handleChange}
          value={currentOptionValue}
          options={defaultOptions}
          placeholder="Custom target"
          className={styles.selectCustomTarget}
          size="lg"
          rootId="root6"
        />
      </Spacer>
      <div id="root6" />
    </>
  )
}

// ------------------

export const CustomViaChildren = (): JSX.Element => {
  type IsSelectContexMulty = true

  const alwaysPersistOptions: SelectBaseOption[] = [
    { value: 4, label: 'I am always here' },
    { value: 5, label: 'Me too!' },
  ]

  const Body = () => {
    const { commonProps } = useSelectContext<IsSelectContexMulty>()
    const { filter, searchValue, selectedValue } = commonProps

    const filteredOptions = filter(defaultOptions, searchValue)

    return (
      <div style={{ backgroundColor: 'lavender' }}>
        {filteredOptions.map((op) => {
          const isSelected = (): boolean => {
            for (const selectedOption of selectedValue) {
              if (selectedOption.value === op.value) return true
            }

            return false
          }

          return <MultiselectDefaults.Item key={op.value} option={op} isSelected={isSelected()} />
        })}

        <Divider />

        {alwaysPersistOptions.map((op) => {
          const isSelected = (): boolean => {
            for (const selectedOption of selectedValue) {
              if (selectedOption.value === op.value) return true
            }

            return false
          }

          return <MultiselectDefaults.Item key={op.value} option={op} isSelected={isSelected()} />
        })}
      </div>
    )
  }

  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption[]>([])
  const handleChange = useCallback(
    (options: SelectBaseOption[]) => {
      setCurrentOptionValue(options)
    },
    [setCurrentOptionValue],
  )

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <Multiselect onChange={handleChange} value={currentOptionValue} rootId="root7" placeholder="Ну полный кастом" searchable>
          <Body />
        </Multiselect>
      </Spacer>
      <div id="root7" />
    </>
  )
}

// ---------------

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

  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption[]>([])
  const handleChange = useCallback(
    (options: SelectBaseOption[]) => {
      setCurrentOptionValue(options)
    },
    [setCurrentOptionValue],
  )

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <Multiselect
          onChange={handleChange}
          value={currentOptionValue}
          options={options}
          loading={isLoading}
          placeholder="Suggest"
          rootId="root8"
        />
      </Spacer>
      <div id="root8" />
    </>
  )
}

// --------------

export const CustomSelectAllItem = (): JSX.Element => {
  const MySelectAllItem = (): JSX.Element => {
    return <MultiselectDefaults.SelectAllItem label="Мне все опции сразу, пожалуйста" />
  }

  const [currentOptionValue, setCurrentOptionValue] = useState<SelectBaseOption[]>([])
  const handleChange = useCallback(
    (options: SelectBaseOption[]) => {
      setCurrentOptionValue(options)
    },
    [setCurrentOptionValue],
  )

  const components = useMemo(() => ({ SelectAllItem: MySelectAllItem }), [])

  return (
    <>
      <Spacer marginBottom={'250px'}>
        <Multiselect
          onChange={handleChange}
          value={currentOptionValue}
          options={defaultOptions}
          components={components}
          allowSelectAll
          placeholder="Custom SelectAllItem"
          rootId="root9"
        />
      </Spacer>
      <div id="root9" />
    </>
  )
}


// --------------

export const CustomLoadingAndNoOptions = (): JSX.Element => {
  return (
    <div>
      Кастомизация компонентов Loadind и NoOptions выполняется так же, как в компоненте{' '}
      <a onClick={linkTo('Forms/Selects/Select_v2', 'Custom No Options')}>Select</a>
    </div>
  )
}
