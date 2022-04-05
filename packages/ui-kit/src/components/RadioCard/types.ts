interface RadioCardProps {
  className?: string
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  header?: string
  subHeader: string
  description?: string
  selected: boolean
  onClick: () => void
  disabled?: boolean
}

export type { RadioCardProps }
