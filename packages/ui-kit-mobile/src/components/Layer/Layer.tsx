import { noop } from '@city/ui-kit-core'
import cx from 'classnames'
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { animated, config, SpringConfig, useSpring } from 'react-spring'
import { useGesture } from 'react-use-gesture'

import { useDimensions, useWindowDimensions } from '../../hooks'
import { checkIsAndroid, getCssVarValue } from '../../utils'
import { LAYER_TRANSITION_TIMEOUT } from './constants'
import s from './Layer.module.scss'
import { LayerOnChangeEvent, LayerProps, LayerRef } from './types'

const LayerComponent = forwardRef<LayerRef, LayerProps>((props, layerRef) => {
  const {
    children,
    contentTop,
    fixedTop = true,
    topOffset,
    opened = true,
    dismissible = true,
    disabled,
    initialPosition: initialPositionProp,
    overscrollHeight = 0,
    overScroll = true,
    wheelEnabled = true,
    safeAreaEnabled = true,
    className,
    style,
    onClose = noop,
    onInitial = noop,
    onFullscreen = noop,
    onEnd = noop,
  } = props

  const { ref, height: h } = useDimensions<HTMLDivElement>()

  const { ref: topRef, height: topHeight } = useDimensions<HTMLDivElement>()

  const { height: windowHeight } = useWindowDimensions()

  const topInset = topOffset ?? (parseFloat(getCssVarValue('--safe-area-inset-top')) || 0)

  const safeAreaTop = safeAreaEnabled ? topInset : 0

  /** отнимаем от высоты нижний паддинг для оверскролла */
  const height = h - overscrollHeight

  /**
   * Положение открытого слоя до верхней грани экрана
   */
  const openedPosition = -windowHeight + safeAreaTop + topHeight

  const closedPosition = topHeight || 0

  /**
   * Начальное положение слоя из currentOptions.
   * Если положение не задано открываем слой в фуллскрин
   */
  const optionsInitialPosition = initialPositionProp ?? -openedPosition

  const calcInitialPosition =
    optionsInitialPosition > 0 && optionsInitialPosition < 1
      ? optionsInitialPosition * windowHeight
      : optionsInitialPosition

  /** Положение при открытом слое до конца */
  const endPosition = -height

  /**
   * Начальное положение слоя.
   * Если высота слоя меньше, чем в currentOptions.initialPosition, то используем endPosition
   */
  const initialPosition = height < calcInitialPosition ? endPosition : -calcInitialPosition

  const [{ y }, animation] = useSpring(() => ({ y: closedPosition }))

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollingRef = useRef(false)
  const firstMY = useRef(0)
  const lastVY = useRef(0)
  const startY = useRef(y.get())

  const isAndroid = checkIsAndroid()

  const getAnimationConfig = useCallback(
    (additional?: SpringConfig): SpringConfig => ({
      ...config.stiff,
      ...additional,
    }),
    [],
  )

  /** Меняет положение слоя со скоростью жеста */
  const scrollTo = useCallback(
    (my: number, velocity = 0, config?: SpringConfig) => {
      animation.start({
        y: my,
        immediate: false,
        config: getAnimationConfig({ velocity: Number(velocity), ...config }),
      })

      /** Если вернули на прошлое положеие, то не вызываем коллбэк */
      if (startY.current === my) {
        return
      }

      switch (my) {
        case endPosition:
          onEnd()

          return
        case initialPosition:
          onInitial()

          return
        case openedPosition:
          onFullscreen()

          return
      }

      startY.current = 0
    },
    [animation, endPosition, getAnimationConfig, initialPosition, onEnd, onFullscreen, onInitial, openedPosition],
  )

  /** Закрывает слой */
  const close = useCallback(
    (velocity?: number) =>
      new Promise<void>((resolve) => {
        scrollTo(closedPosition, velocity)
        setTimeout(() => {
          onClose()
          resolve()
        }, LAYER_TRANSITION_TIMEOUT)
      }),
    [scrollTo, closedPosition, onClose],
  )

  /** Симулирует плавный сколл с замедлением при свайпе */
  const scrollMomentum = useCallback(
    (my: number, velocity: number) => {
      scrollingRef.current = true
      void animation
        .start({
          y: my,
          onChange: (result) => {
            const vel = y.velocity
            const startBound = result.value.y <= endPosition ? endPosition : undefined
            const bound = result.value.y >= openedPosition ? openedPosition : startBound

            /** Если скролл дошел до границы слоя, то останавливем его сдвигаем слой до границы */
            if (bound !== undefined) {
              scrollingRef.current = false
              y.stop()
              scrollTo(bound, isAndroid ? 0 : vel, { decay: false })
            }
          },
          config: getAnimationConfig({ decay: true, velocity }),
        })[0]
        .then(() => {
          scrollingRef.current = false
        })
    },
    [animation, getAnimationConfig, y, endPosition, openedPosition, scrollTo, isAndroid],
  )

  const onChange = useCallback(
    (event: LayerOnChangeEvent) => {
      const { first, last, vy: eventVY, my } = event

      if (first) {
        firstMY.current = my
        startY.current = y.get()
      }

      if (eventVY !== 0) {
        lastVY.current = eventVY
      }

      if (last) {
        const vy =
          eventVY === 0 && my !== initialPosition && my !== openedPosition && my !== endPosition
            ? lastVY.current
            : eventVY

        // При оверсколле возвращаем в endPosition
        if (my === endPosition && vy !== 0) {
          return scrollTo(endPosition, vy)
        }

        // Закрываем слой
        if ((my > initialPosition && firstMY.current > initialPosition && vy > 0.5) || my > initialPosition / 2) {
          void close(vy)

          return
        }

        const scrollToInitial = initialPosition > my && my > openedPosition && vy > 0.5

        const distanceBetweenPositions = openedPosition - initialPosition
        const breakPoint = openedPosition - distanceBetweenPositions / 2

        // Переводим в дефолтное положение по свайпу или по последнему положению
        if (my > initialPosition || scrollToInitial || (my > breakPoint && vy > 0)) {
          return scrollTo(initialPosition, vy)
        }

        const isHigherThanOpened = -height <= openedPosition
        const canBeOpened = isHigherThanOpened || initialPosition !== -height
        const nextPosition = isHigherThanOpened ? openedPosition : -height

        // Открываем слой на весь экран по свайпу
        if (canBeOpened && my > nextPosition && vy < 0) {
          return scrollTo(nextPosition, vy)
        }

        // Плавный скролл в открытом состоянии
        if (openedPosition > endPosition) {
          return scrollMomentum(my, vy)
        }
      }

      // Перемещаем слой по активному тач событию
      animation.start({ y: my, immediate: true })
    },
    [animation, y, endPosition, initialPosition, openedPosition, height, scrollTo, close, scrollMomentum],
  )

  const bind = useGesture(
    {
      onTouchStart: () => {
        if (scrollingRef.current) {
          return y.stop()
        }
      },
      onDrag: ({ first, last, vxvy: [, vy], movement: [, my] }) => {
        if (disabled) {
          return
        }

        return onChange({ first, last, vy, my })
      },
      onWheel: (event) => {
        const {
          delta: [, dy],
          vxvy: [, vy],
          first,
          last,
        } = event

        /**
         * При скролле колесом мыши мы получаем не текущее положение слоя, а положение колеса,
         * поэтому вычитаем от текущего положения слоя дельту колеса
         */
        const my = y.get() - dy

        if (my <= endPosition || my >= initialPosition) {
          return false
        }

        return onChange({ first, last, vy, my })
      },
    },
    {
      drag: {
        initial: () => [0, y.get()],
        filterTaps: true,
        bounds: { top: endPosition, bottom: !dismissible ? initialPosition : closedPosition },
        rubberband: overScroll,
        axis: 'y',
        enabled: opened,
      },
      wheel: {
        axis: 'y',
        enabled: opened && wheelEnabled,
      },
    },
  )

  const moveToInitial = useCallback(() => {
    if (!opened) {
      return
    }

    scrollTo(initialPosition)
  }, [opened, scrollTo, initialPosition])

  const moveToEnd = useCallback(() => {
    if (!opened) {
      return
    }

    scrollTo(endPosition)
  }, [opened, scrollTo, endPosition])

  const moveToNode = useCallback(
    (node: HTMLElement, offset = 0) => {
      if (!containerRef.current || !opened) {
        return
      }

      const targetRect = node.getBoundingClientRect()
      const layerRect = containerRef.current.getBoundingClientRect()

      const targetY = targetRect.y + targetRect.height

      const diff = -(targetY - layerRect.y) - offset

      let nextY = y.get() + diff

      if (nextY > initialPosition) {
        nextY = initialPosition
      }

      if (nextY < initialPosition && nextY > openedPosition) {
        nextY = openedPosition
      }

      if (nextY < endPosition) {
        nextY = endPosition
      }

      scrollTo(nextY)
    },
    [opened, y, initialPosition, openedPosition, endPosition, scrollTo],
  )

  useImperativeHandle(layerRef, () => ({ moveToInitial, moveToEnd, moveToNode, close }), [
    moveToInitial,
    moveToEnd,
    moveToNode,
    close,
  ])

  useEffect(() => {
    if (!opened) {
      scrollTo(closedPosition)
    }

    /**
     * Сдвигаем слой до initialPosition, если оно обновилось.
     * Это возможно если внутри экрана изменился
     * размер контента и он меньше заданного currentOptions.initialPosition
     */
    if (initialPosition < 0 && y.get() > endPosition) {
      moveToInitial()
    }

    /**
     * Смотрим только на initialPosition,
     * так как нам нужно двигать слой только на его изменение
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPosition, opened])

  useEffect(() => {
    if (!opened) {
      return
    }

    const nextEnd = endPosition
    const shouldScrollToEndAfterUpdate = y.get() < 0 && nextEnd > y.get()

    if (shouldScrollToEndAfterUpdate) {
      scrollTo(nextEnd)
    }

    /**
     * Сдвигаем слой до endPosition, если оно обновилось.
     * Это возможно если внутри экрана изменился
     * размер контента и он стал меньше предыдущего
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endPosition])

  useEffect(() => {
    if (topHeight > 0 && y.get() >= 0 && !opened) {
      animation.start({ y: closedPosition, immediate: true })

      return
    }

    /**
     * Сдвигаем слой вниз, когда получили topHeight и слой должен быть закрыть
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topHeight])

  const classNames = cx(s.container, className)

  const topOpacity = y.to([initialPosition / 2, 0], [1, 0], 'clamp')

  const topY = y.to(
    [openedPosition, topHeight],
    [openedPosition + endPosition - topHeight, endPosition],
    fixedTop ? 'clamp' : 'extend',
  )

  return (
    <div className={classNames} style={style} ref={containerRef}>
      <animated.div
        {...bind()}
        className={s.layer}
        style={{
          y,
          pointerEvents: 'auto',
          transformOrigin: 'center',
          // Магия, которая повышает fps на android
          rotate: 0.02,
        }}
        ref={ref}
      >
        {children}
      </animated.div>
      <animated.div
        style={{
          y: topY,
          opacity: topOpacity,
        }}
        ref={topRef}
      >
        {contentTop}
      </animated.div>
    </div>
  )
})

/**
 * Draggable layer
 *
 * ВАЖНО! Компонент использует ResizeObserver, поэтому нужно использовать polyfill
 * для корректной работы во всех браузерах.
 *
 * Установите пакет `@juggle/resize-observer` и добавьте:
 *
 * ```tsx
 * import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer'
 *
 * if (typeof window.ResizeObserver !== 'function') {
 *   window.ResizeObserver = ResizeObserverPolyfill
 * }
 * ```
 *
 */
export const Layer = memo(LayerComponent)
