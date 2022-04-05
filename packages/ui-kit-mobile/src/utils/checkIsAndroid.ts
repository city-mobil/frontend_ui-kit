/**
 * Проверяет userAgent на принадлежность к android
 */
export const checkIsAndroid = (): boolean => /(android)/i.test(navigator.userAgent)
