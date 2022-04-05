import { OverlayRef } from '@city/ui-kit-core'
import { MutableRefObject, ReactNode, useCallback, useEffect, useRef } from 'react'

const AUTOHIDE_TIMEOUT = 3000

interface UseTemporarilyShowTooltipReturn {
  iconRef: MutableRefObject<HTMLDivElement | null>
  tooltipRef: MutableRefObject<OverlayRef | null>
  temporarilyShowTooltip: () => void
  handleMouseEnterIcon: () => void
}

export const useTemporarilyShowTooltip = (
  autoShowErrorTooltip: boolean,
  errorTooltipText: ReactNode,
): UseTemporarilyShowTooltipReturn => {
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const iconRef = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<OverlayRef>(null)

  const temporarilyShowTooltip = useCallback((): void => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current)
    }

    if (errorTooltipText) {
      tooltipRef.current?.show()
    }

    tooltipTimeoutRef.current = setTimeout(() => {
      tooltipRef.current?.hide()
    }, AUTOHIDE_TIMEOUT)
  }, [errorTooltipText])

  const handleMouseEnterIcon = (): void => {
    if (!tooltipTimeoutRef.current) return

    clearTimeout(tooltipTimeoutRef.current)
  }

  useEffect(() => {
    if (!errorTooltipText || !iconRef.current) return

    if (autoShowErrorTooltip) {
      temporarilyShowTooltip()
    } else {
      tooltipRef.current?.show()
    }
  }, [autoShowErrorTooltip, errorTooltipText, temporarilyShowTooltip])

  return { iconRef, tooltipRef, temporarilyShowTooltip, handleMouseEnterIcon }
}
