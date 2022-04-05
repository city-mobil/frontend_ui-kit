import cx from 'classnames'
import React, { useCallback, useMemo, useState } from 'react'

import { ReactComponent as SvgOpenCollapse } from '../../assets/svg/ic-arrow-bottom.svg'
import { Collapsible } from './Collapsible'
import styles from './CollapsiblePanel.module.scss'

export interface CollapsiblePanelProps {
  header: React.ReactNode
  body: React.ReactNode
  className?: string
  headerHeight: number
  onOpen?: () => void
  onClose?: () => void
  open?: boolean | null
}

export const CollapsiblePanel = ({
  className,
  headerHeight,
  header,
  body,
  onOpen,
  onClose,
  open = null,
  ...restProps
}: CollapsiblePanelProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const ownOnOpen = useCallback(() => {
    setIsOpen(true)
    onOpen && onOpen()
  }, [onOpen])
  const ownOnClose = useCallback(() => {
    setIsOpen(false)
    onClose && onClose()
  }, [onClose])

  const headerHeightStyle = useMemo(() => ({ height: `${headerHeight}px` }), [headerHeight])

  return (
    <div className={cx(styles.container, className)}>
      <Collapsible
        headerHeight={headerHeight}
        header={
          <div style={headerHeightStyle} className={styles.header}>
            {header}
            <div style={headerHeightStyle} className={styles.arrowContainer}>
              <div className={cx(styles.arrow, { [styles.arrow__opened]: isOpen })}>
                <SvgOpenCollapse />
              </div>
            </div>
          </div>
        }
        body={
          <div className={styles.body}>
            <div className={styles.separator} />
            {body}
          </div>
        }
        open={open}
        onOpen={ownOnOpen}
        onClose={ownOnClose}
        {...restProps}
      />
    </div>
  )
}
