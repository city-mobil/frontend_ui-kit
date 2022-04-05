import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import svgr from '@svgr/rollup'
import postcss from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
import url from '@rollup/plugin-url'
import smartAsset from 'rollup-plugin-smart-asset'
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
    typescript({ exclude: './src/storybook/**' }),
    url({ limit: Infinity, exclude: ['**/*.png '] }),
    svgr({
      svgoConfig: {
        plugins: {
          removeViewBox: false,
        },
      },
    }),
    smartAsset({ keepImport: true, extensions: ['.png'] }),
    postcss({
      extract: true,
      plugins: [postcssImport()],
    }),
  ],
  external: [...Object.keys(pkg.peerDependencies), ...Object.keys(pkg.dependencies)],
}
