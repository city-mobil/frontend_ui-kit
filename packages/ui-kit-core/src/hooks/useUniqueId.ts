import { useMemo } from 'react'

import { uniqueId } from '../utils'

export const useUniqueId = (prefix?: string): string => useMemo(() => uniqueId(prefix), [prefix])
