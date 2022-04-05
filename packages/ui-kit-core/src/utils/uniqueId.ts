const createGenerator = (): ((prefix?: string) => string) => {
  let id = 0

  return (prefix = ''): string => `${prefix}_${id++}`
}

export const uniqueId = createGenerator()
