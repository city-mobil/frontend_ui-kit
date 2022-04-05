import { TypographyHeaderProps } from '@city/ui-kit-core'
import { ReactNode } from 'react'

import { Sorter } from '../../hooks/useSorter'
import type { TableCell, TableHeader, TableHeaderCell, TableRow } from './components'

export interface TableCommonProps {
  className?: string
  children?: ReactNode
}

export interface TableProps extends TableCommonProps {
  columnWidths: string[]
}

export type TableHeaderProps = TypographyHeaderProps & TableCommonProps

export interface TableHeaderCellProps extends TableCommonProps {
  sortName?: string
  textAlign?: 'left' | 'center' | 'right'
  sort?: Sorter
  onReSort?: (newSort: Sorter | null) => void
}

export type TableRowProps = TableCommonProps

export interface TableCellProps extends TableCommonProps {
  textAlign?: 'left' | 'center' | 'right'
}

export interface TableSubcomponents {
  Header: typeof TableHeader
  HeaderCell: typeof TableHeaderCell
  Cell: typeof TableCell
  Row: typeof TableRow
}
