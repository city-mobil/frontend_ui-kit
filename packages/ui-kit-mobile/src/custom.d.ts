declare module '*.svg' {
  import React = require('react')

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.png' {
  const value: string
  export = value
}

declare module '*.scss' {
  const value: Record<string, string>

  export default value
}
