export interface TransitionProps {
  in: boolean
  timeout?: number
  easing?: string
  onEnter?: () => void
  onExit?: () => void
}
