import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirnamenew = path.dirname(__filename)

const projectRoot = path.resolve(__dirnamenew)

const override = { compilerOptions: { module: 'ESNext' } }



const entries = [
  'src/index.ts',
]

const plugins = [
  alias({
    entries: [
        { find: /^node:(.+)$/, replacement: '$1' },
        // {find: "@src", replacement: path.resolve(projectRoot, 'src')}
    ],
  }),
  resolve({
    preferBuiltins: true,
  }),
  ts({ tsconfig: './tsconfig.json', tsconfigOverride: override }),
  json(),
  commonjs(),
  esbuild({
    target: 'node14',
  }),
]

export default [
  ...entries.map(input => ({
    input,
    output: [
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.mjs'),
        format: 'esm',
      },
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.cjs'),
        format: 'cjs',
        },
    ],
    external: [],
    plugins,
  })),
  ...entries.map(input => ({
    input,
    output: {
      file: input.replace('src/', '').replace('.ts', '.d.ts'),
      format: 'esm',
    },
    external: [],
    plugins: [
      dts({ respectExternal: true }),
    ],
  })),

]