import { useCallback, useState } from 'react'

export type SorterUpdateType = 'replace' | 'push' | 'replaceIn' | 'pushIn'
export interface Sorter {
  field: string
  order: 'asc' | 'desc'
}
export type SorterHook = () => [Sorter, (newValue: Sorter | null, updateType?: SorterUpdateType) => void]

export const useSorter: SorterHook = () => {
  const [sort, setSort] = useState<Sorter | null>(null)
  const setter = useCallback(
    (newValue: Sorter, updateType: SorterUpdateType) => {
      const isUpdateIn = updateType === 'replaceIn' || updateType === 'pushIn'
      const newSort = { ...(isUpdateIn ? sort : {}), ...newValue }
      setSort(newSort)
    },
    [sort, setSort],
  )

  return [sort, setter] as ReturnType<SorterHook>
}
