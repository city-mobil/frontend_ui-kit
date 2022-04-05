import cx from 'classnames'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { noop } from '../../helpers'
import styles from './Collapsible.module.scss'

export interface CollapsibleProps {
  defaultIsOpen?: boolean
  header: React.ReactNode
  body: React.ReactNode
  className?: string
  headerHeight: number
  onOpen?: () => void
  onClose?: () => void
  open?: boolean | null
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  defaultIsOpen = false,
  header,
  body,
  className,
  headerHeight,
  onOpen = noop,
  onClose = noop,
  open = null,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const [fullHeight, setFullHeight] = useState(0)

  const onHeaderClick = useCallback(() => {
    if (open !== null) {
      return
    }

    setIsOpen(!isOpen)

    if (!isOpen) {
      onOpen()
    } else {
      onClose()
    }
  }, [open, isOpen, onOpen, onClose])

  useEffect(() => {
    if (open !== null) {
      setIsOpen(open)
    }
  }, [open])

  useLayoutEffect(() => {
    const newFullHeight = containerRef.current ? containerRef.current.scrollHeight : 0

    if (newFullHeight > 0 && newFullHeight !== fullHeight) {
      setFullHeight(newFullHeight)
    }
  }, [setFullHeight, fullHeight, headerHeight])

  const containerHeightStyle = useMemo(
    () => (isOpen ? { height: `${fullHeight}px` } : { height: `${headerHeight}px` }),
    [fullHeight, headerHeight, isOpen],
  )

  const headerHeightStyle = useMemo(() => ({ flex: `0 0 ${headerHeight}px` }), [headerHeight])

  return (
    <div ref={containerRef} className={cx(styles.container, className)} style={containerHeightStyle}>
      <div className={styles.header} onClick={onHeaderClick} style={headerHeightStyle}>
        <div className={styles.headerElement}>{header}</div>
      </div>
      <div className={styles.body}>{body}</div>
    </div>
  )
}
