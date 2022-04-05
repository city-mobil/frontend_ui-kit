import React, { memo, useCallback, useEffect, useRef } from 'react'

import { useDebounce } from '../../hooks/useDebounce'
import styles from './TimeSelect.module.scss'
import { NumberProps, NumbersListProps } from './types'

const SCROLL_OPTIONS: ScrollIntoViewOptions = {
  behavior: 'auto',
  block: 'center',
}

const SCROLL_OPTIONS_SMOOTH: ScrollIntoViewOptions = { ...SCROLL_OPTIONS, behavior: 'smooth' }

const NumberItem = memo<NumberProps>(({ number, onMouseDown, testPrefix }) => (
  <li className={styles.number} onMouseDown={onMouseDown} data-test-id={`${testPrefix}-${number}`} role="presentation">
    {number}
  </li>
))

NumberItem.displayName = 'NumberItem'

export const NumbersList: React.FC<NumbersListProps> = ({ numbers, value, onChange, testPrefix }) => {
  const numbersContainerRef = useRef<HTMLUListElement | null>(null)
  const selectContainerRef = useRef<HTMLDivElement | null>(null)
  const valueRef = useRef('')

  const handleChange = useCallback(
    (innerValue: string) => {
      if (value === innerValue) return

      valueRef.current = innerValue
      onChange(innerValue)
    },
    [onChange, value],
  )

  const scrollToValue = useCallback((options: ScrollIntoViewOptions, value?: string | number) => {
    if (!value || String(value).length !== 2) return

    void numbersContainerRef.current?.children[Number(value)].scrollIntoView(options)
  }, [])

  useEffect(() => {
    if (valueRef.current === value) return

    scrollToValue(SCROLL_OPTIONS, value)
  }, [value, scrollToValue])

  const handleScroll = useCallback(() => {
    if (!selectContainerRef.current || !numbersContainerRef.current) {
      return
    }

    const { top: selectContainerTop } = selectContainerRef.current.getBoundingClientRect()
    let selectedNode = null

    for (let i = 0; i < numbersContainerRef.current.childElementCount; i++) {
      const children = numbersContainerRef.current?.children[i]

      const { top } = children.getBoundingClientRect()

      if (top === selectContainerTop) {
        selectedNode = children.textContent
        break
      }
    }

    if (selectedNode) {
      handleChange(selectedNode)
    }
  }, [handleChange])

  const debouncedHandleScroll = useDebounce(handleScroll)

  const onNumberClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
      e.preventDefault()
      scrollToValue(SCROLL_OPTIONS_SMOOTH, e.currentTarget.textContent || '')
    },
    [scrollToValue],
  )

  return (
    <div className={styles.numberList}>
      <ul className={styles.numbers} ref={numbersContainerRef} onScroll={debouncedHandleScroll}>
        {numbers.map((number) => (
          <NumberItem key={number} onMouseDown={onNumberClick} number={number} testPrefix={testPrefix} />
        ))}
      </ul>
      <div ref={selectContainerRef} className={styles.numberSelected} />
    </div>
  )
}
