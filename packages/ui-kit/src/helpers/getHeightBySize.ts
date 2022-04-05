import { Size } from '../types'

const sizes = {
  xs: '28px',
  sm: '36px',
  md: '40px',
  lg: '52px',
}

export const getHeightBySize = (size: Size): string => {
  return sizes[size]
}
