import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: false,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({ exclude: 'src/storybook/*' }),
    postcss({
      extract: true,
      plugins: [postcssImport()],
    }),
  ],
  external: [...Object.keys(pkg.peerDependencies)],
}
