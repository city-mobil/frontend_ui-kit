import React, { useCallback, useState } from 'react'
import { Paginator, PaginatorProps } from '../../../components/Paginator'

export default {
  title: 'Navigation/Paginator',
  component: Paginator,
}

export const PrimaryStory = (props: PaginatorProps) => {
  const [localIndex, setLocalIndex] = useState(props.index)
  const onSelect = useCallback((value) => {
    setLocalIndex(value)
  }, [])

  return <Paginator {...props} onSelect={onSelect} index={localIndex} />
}

PrimaryStory.args = {
  index: 1,
  totalPages: 20,
  maxVisiblePages: 10,
}
