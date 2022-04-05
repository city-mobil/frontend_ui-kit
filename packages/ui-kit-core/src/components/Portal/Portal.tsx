import React, { PropsWithChildren, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { OVERLAY_ROOT_ID } from '../../constants'

export interface PortalProps {
  rootId?: string
  enable?: boolean
}

export const Portal = ({
  children,
  rootId = OVERLAY_ROOT_ID,
  enable = true,
}: PropsWithChildren<PortalProps>): JSX.Element | React.ReactPortal | null => {
  const [rootRef, setRootRef] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const ref = document.getElementById(rootId)

    setRootRef(ref)
  }, [rootId])

  if (!enable) return <>{children}</>

  return rootRef && createPortal(children, rootRef)
}
