import { ICON_WIDTH, iconsIdentBySize } from '../../internal/components'
import { Size } from '../../types'

export const calcPrefixWidth = (isPrefix: boolean, size: Size): number => {
  return isPrefix ? ICON_WIDTH + 2 * iconsIdentBySize[size] : 0
}
