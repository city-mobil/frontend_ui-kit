import { uniqueId } from '@city/ui-kit-core'
import cx from 'classnames'
import React, { createContext, ReactText, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { noop } from '../../helpers'
import styles from './Radio.module.scss'

export interface RadioGroupProps {
  value?: ReactText
  /**
   * The name property of all `input[type="radio"]` children. If no name provided, then unique one will be generated automatically
   */
  name?: string
  /**
   * Specifies whether the radios will be positioned vertically or horizontally
   */
  vertical?: boolean
  disabled?: boolean
  className?: string
  onChange?: (value: ReactText) => void
}

interface RadioContext {
  contextValue?: ReactText
  contextDisabled?: boolean
  contextName?: string
  contextHandleChange: (value: ReactText) => void
}

export const radioContext = createContext<RadioContext | null>(null)

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  value,
  name,
  vertical = false,
  disabled = false,
  className = '',
  onChange = noop,
}) => {
  const [stateValue, setStateValue] = useState<ReactText | undefined>(value)

  const {
    contextHandleChange: parentContextHandleChange = noop,
    contextValue: parentContextValue,
    contextName: parentContextName,
  } = useContext(radioContext) || {}

  useEffect(() => {
    if (value !== undefined) {
      setStateValue(value)

      return
    }

    if (parentContextValue !== undefined) {
      setStateValue(parentContextValue)
    }
  }, [parentContextValue, value])

  const contextValue = value === undefined ? parentContextValue || stateValue : value

  const contextHandleChange = useCallback(
    (newValue: ReactText) => {
      onChange(newValue)
      parentContextHandleChange(newValue)
      setStateValue(newValue)
    },
    [onChange, parentContextHandleChange],
  )

  const contextName = useMemo(() => name || parentContextName || uniqueId('radio_group__'), [name, parentContextName])

  return (
    <radioContext.Provider
      value={{
        contextDisabled: disabled,
        contextHandleChange,
        contextValue,
        contextName,
      }}
    >
      <div className={cx(styles.groupContainer, { [styles.groupContainer__vertical]: vertical }, className)}>
        {children}
      </div>
    </radioContext.Provider>
  )
}
