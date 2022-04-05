export const range = (start: number, end: number, step: number): number[] => {
  const arr: number[] = []

  for (let i = start; i < end; i += step) {
    arr.push(i)
  }

  return arr
}
