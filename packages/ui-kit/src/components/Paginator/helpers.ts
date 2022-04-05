import { range } from '@city/ui-kit-core'

import { DOTS } from './constants'

interface GetRangeIndexReturn {
  endIndex: number
  startIndex: number
}

const getRangeIndex = (active: number, totalPages: number, maxVisiblePages: number): GetRangeIndexReturn => {
  const initStart = 2
  const initEnd = totalPages - 1
  const middleDelta = Math.floor((maxVisiblePages - 4) / 2)
  const sideDelta = maxVisiblePages - 2
  const middleRangeCount = maxVisiblePages - 4

  let startIndex = active < sideDelta - middleDelta ? initStart : active - middleDelta
  startIndex = Math.max(initStart, startIndex)
  startIndex = Math.min(initEnd - middleRangeCount, startIndex)
  if (startIndex < initStart) {
    startIndex = initStart
  }

  let endIndex = totalPages - active < middleRangeCount ? initEnd : active + middleDelta
  endIndex = active <= middleRangeCount ? Math.max(sideDelta, active + middleDelta) : endIndex
  endIndex = Math.min(initEnd, endIndex)

  return {
    endIndex,
    startIndex,
  }
}

type DotsType = typeof DOTS
type GetPageCollectionReturn = (number | DotsType)[]

export const getPageCollection = (
  active: number,
  totalPages: number,
  maxVisiblePages: number,
): GetPageCollectionReturn => {
  const rangeIndex = getRangeIndex(active, totalPages, maxVisiblePages)
  const pageRange = range(rangeIndex.startIndex, rangeIndex.endIndex + 1, 1)
  const showLeftSpread = rangeIndex.startIndex > 2
  const showRightSpread = totalPages - rangeIndex.endIndex > 1
  const left: GetPageCollectionReturn = [1]
  const right: GetPageCollectionReturn = [totalPages]

  if (showLeftSpread) {
    left.push(DOTS)
  }

  if (showRightSpread) {
    right.unshift(DOTS)
  }

  return [...left, ...pageRange, ...right]
}
