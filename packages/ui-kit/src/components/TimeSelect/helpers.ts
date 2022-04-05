export const sanitizeValue = (value: string): string => {
  let sanitizedValue = ''

  for (const [index, char] of value.split('').entries()) {
    const numberChar = Number(char)

    if (index === 0 && numberChar >= 0 && numberChar <= 2) {
      sanitizedValue += char
    }

    if (index === 1 && !isNaN(numberChar)) {
      if (value[0] === '2' && numberChar >= 0 && numberChar <= 3) {
        sanitizedValue += char
      }

      if (value[0] !== '2' && !isNaN(numberChar)) {
        sanitizedValue += char
      }
    }

    if (index === 2) {
      if (char === ':') {
        sanitizedValue += char
      } else if (numberChar >= 0 && numberChar <= 5) {
        sanitizedValue += ':'
        sanitizedValue += char
      }
    }

    if (index === 3) {
      if (value[2] === ':' && numberChar >= 0 && numberChar <= 5) {
        sanitizedValue += char
      }

      if (value[2] !== ':' && !isNaN(numberChar)) {
        sanitizedValue += char
      }
    }

    if (index === 4 && !isNaN(numberChar)) {
      sanitizedValue += char
    }
  }

  return sanitizedValue
}

const complementToTwoDigits = (time: string | number): string =>
  String(time).length < 2 ? `0${time}` : String(time).slice(0, 2)

export const getValidHours = (hours: string): string => {
  const numberHours = Number(hours)

  return numberHours >= 0 && numberHours <= 24 ? complementToTwoDigits(hours) : '00'
}

export const getValidMinutes = (minutes: string): string => {
  const numberMinutes = Number(minutes)

  return numberMinutes >= 0 && numberMinutes <= 59 ? complementToTwoDigits(minutes) : '00'
}

export const getComplementedTime = (hours: string, minutes: string): string => {
  if (!hours && !minutes) return ''

  return `${getValidHours(hours)}:${getValidMinutes(minutes)}`
}

const generateTimeSequence = (length: number): string[] =>
  Array.from(new Array(length), (_, i) => complementToTwoDigits(i))

export const HOURS = generateTimeSequence(24)

export const MINUTES = generateTimeSequence(60)
