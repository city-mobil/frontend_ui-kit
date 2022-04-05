import { VirtualElement } from '@popperjs/core'

export const isValidDOMElement = (
  el: HTMLElement | SVGElement | VirtualElement | null,
): el is HTMLElement | SVGElement => {
  return el instanceof HTMLElement || el instanceof SVGElement
}
