import { Size } from '../../../types'
import { ICON_GAP, ICON_WIDTH, iconsIdentBySize } from './constants'

export const calcSuffixWidth = (numIcons: number, size: Size): number => {
  if (numIcons === 0) return 0

  let width = 0

  width += numIcons * ICON_WIDTH
  width += 2 * iconsIdentBySize[size]
  width += (numIcons - 1) * ICON_GAP

  return width
}
