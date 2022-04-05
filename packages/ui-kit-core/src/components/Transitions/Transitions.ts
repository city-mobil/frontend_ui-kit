import { FadeIn } from './FadeIn'
import { FadeInWithScale } from './FadeInWithScale'
import { NoTransition } from './NoTransition'
import { Scale } from './Scale'
import { SlideInBottom } from './SlideInBottom'
import { SlideInRight } from './SlideInRight'

export interface TransitionsComponents {
  FadeIn: typeof FadeIn
  FadeInWithScale: typeof FadeInWithScale
  Scale: typeof Scale
  SlideInBottom: typeof SlideInBottom
  SlideInRight: typeof SlideInRight
  NoTransition: typeof NoTransition
}

export const Transitions: TransitionsComponents = {
  FadeIn,
  FadeInWithScale,
  Scale,
  SlideInBottom,
  SlideInRight,
  NoTransition,
}
