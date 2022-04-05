import { SelectBaseOption } from './types'

const KEYBOARD_LAYOUT_EN_RU: Record<string, string> = {
  q: 'й',
  Q: 'Й',
  w: 'ц',
  W: 'w',
  e: 'у',
  E: 'У',
  r: 'к',
  R: 'К',
  t: 'е',
  T: 'Е',
  y: 'н',
  Y: 'Н',
  u: 'г',
  U: 'Г',
  i: 'ш',
  I: 'Ш',
  o: 'щ',
  O: 'Щ',
  p: 'з',
  P: 'З',
  '[': 'х',
  '{': 'Х',
  ']': 'ъ',
  '}': 'Ъ',
  '|': '/',
  '`': 'ё',
  '~': 'Ё',
  a: 'ф',
  A: 'Ф',
  s: 'ы',
  S: 'Ы',
  d: 'в',
  D: 'В',
  f: 'а',
  F: 'А',
  g: 'п',
  G: 'П',
  h: 'р',
  H: 'Р',
  j: 'о',
  J: 'О',
  k: 'л',
  K: 'Л',
  l: 'д',
  L: 'Д',
  ';': 'ж',
  ':': 'Ж',
  "'": 'э',
  '"': 'Э',
  z: 'я',
  Z: 'Я',
  x: 'ч',
  X: 'Ч',
  c: 'с',
  C: 'С',
  v: 'м',
  V: 'М',
  b: 'и',
  B: 'И',
  n: 'т',
  N: 'Т',
  m: 'ь',
  M: 'Ь',
  ',': 'б',
  '<': 'Б',
  '.': 'ю',
  '>': 'Ю',
  '/': '.',
  '?': ',',
  '@': '"',
  '#': '№',
  $: ';',
  '^': ':',
  '&': '?',
}

const KEYBOARD_LAYOUT_RU_EN = Object.entries(KEYBOARD_LAYOUT_EN_RU).reduce((acc, [key, value]) => {
  acc[value] = key

  return acc
}, {} as Record<string, string>)

const fromEng = (str: string): string => str.replace(/./g, (char) => KEYBOARD_LAYOUT_EN_RU[char] || char)

const toEng = (str: string): string => str.replace(/./g, (char) => KEYBOARD_LAYOUT_RU_EN[char] || char)

const escapeForRegExp = (string: string): string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const selectOptionsFilter = <T extends SelectBaseOption = SelectBaseOption>(
  options: T[] = [],
  searchString: string,
): T[] => {
  const toEngSearchString = toEng(searchString)
  const fromEngSearchString = fromEng(searchString)

  // 'i' для игнорирования case при сравнении
  const searchRegExps = [new RegExp(escapeForRegExp(searchString), 'i')]

  if (toEngSearchString !== searchString) {
    searchRegExps.push(new RegExp(escapeForRegExp(toEngSearchString), 'i'))
  }

  if (fromEngSearchString !== searchString) {
    searchRegExps.push(new RegExp(escapeForRegExp(fromEngSearchString), 'i'))
  }

  return options.filter((option) => searchRegExps.some((regExp) => regExp.test(option.label.toLowerCase())))
}
