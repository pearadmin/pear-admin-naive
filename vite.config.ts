import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windiCSS from 'vite-plugin-windicss'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
import {viteMockServe} from 'vite-plugin-mock';
import eslintPlugin from "@nabla/vite-plugin-eslint"

const plugins = [
  vue(),
  windiCSS(),
  vueJsx(),
  legacy({
    targets: ['defaults', 'not IE 11']
  }),
  viteMockServe({
    // default
    mockPath: 'src/mock',
    localEnabled: true,
  }),
  eslintPlugin({
    eslintOptions: {
      cache: false
    }
  })
]

// https://vitejs.dev/config/

export default defineConfig({
  plugins,
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src/')
      }
    ]
  },
  server: {
    port: 3000,
    host: true,
    open: true
  }
})
