import { OverlayEventName, OverlayTrigger } from './types'

export const triggerToEventsMap: Record<OverlayTrigger, OverlayEventName[]> = {
  click: ['focusin', 'focusout'],
  hover: ['mouseenter', 'mouseleave', 'focusin', 'focusout'],
}

export const OVERLAY_CLOSE_TIMEOUT = 200
