import { CSSProperties, ReactNode } from 'react'

export interface LayerRef {
  /**
   * Передвинуть слой на начальное положение
   */
  moveToInitial(): void
  /**
   * Передвинуть слой до конца контента
   */
  moveToEnd(): void
  /**
   * Передвинуть слой до определенного элемента
   */
  moveToNode(node: HTMLElement, offset?: number): void
  /**
   * Закрыть слой
   */
  close(): Promise<void>
}

export interface LayerOnChangeEvent {
  /** первое ли событие */
  first: boolean
  /** последнее ли событие */
  last: boolean
  /** velocity y */
  vy: number
  /** movement y */
  my: number
}

export interface LayerProps {
  children: ReactNode
  /** Контент над слоем */
  contentTop?: ReactNode
  /** Фиксирование контента над слоем при скролле */
  fixedTop?: boolean
  /**
   * Отступ от верхней границы экрана
   * По умолчанию: значение из css var --safe-area-inset-top
   */
  topOffset?: number
  /** Флаг открытия слоя */
  opened?: boolean
  /** Флаг разрешает закрыть слой свайпом вниз */
  dismissible?: boolean
  /** Флаг отключает жесты слоя */
  disabled?: boolean
  /**
   * Начальное положение слоя
   * Значение может быть в пикселях, например 200
   * Либо множителем от 0 до 1, например 0.35 (35% от высоты контента)
   */
  initialPosition?: number
  /**
   * Высота отступа в конце контента для оверскролла
   * Отступ нужно задавать у контента и сюда прокидывать то же значение,
   * чтобы сдвинуть слой на этот отступ вниз
   */
  overscrollHeight?: number
  /**
   * Если слой открыт до конца контента и юзер потянул выше, то будет эффект "резинки"
   */
  overScroll?: boolean
  /**
   * Скролл слоя колесом мыши
   */
  wheelEnabled?: boolean
  /**
   * Флаг включения/отключения отступа от верхней границы экрана
   */
  safeAreaEnabled?: boolean
  className?: string
  style?: CSSProperties
  /**
   * Коллбэк закрытия слоя, в нем нужно менять стейт opened на false
   */
  onClose?: () => void
  /**
   * Коллбэк открытия слоя в initialPosition
   */
  onInitial?: () => void
  /**
   * Коллбэк открытия слоя на весь экран
   */
  onFullscreen?: () => void
  /**
   * Коллбэк открытия слоя до конца контента
   */
  onEnd?: () => void
}
