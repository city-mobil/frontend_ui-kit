/**
 * Получает значение css-переменной из JS.
 * Не везде можно передать переменную в качестве цвета, поэтому приходится получать её из JS.
 * ВАЖНО: Компонент обязан перерендериться при смене темы, иначе значение цвета не обновится.
 * @param cssVar CSS-переменная (например, --dynamic_red).
 * @param _currentTheme Текущая тема для обновления цвета при смене темы.
 */
export const getCssVarValue = (cssVar: string, _currentTheme?: string): string => {
  const element = document.getElementById('root')

  if (!element) {
    return ''
  }

  const computedStyle = window.getComputedStyle(element)

  if (!computedStyle) {
    return ''
  }

  return computedStyle.getPropertyValue(cssVar)
}
