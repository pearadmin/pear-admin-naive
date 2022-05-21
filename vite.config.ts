import type { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import autoComponents from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import purgeIcons from 'vite-plugin-purge-icons'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import legacy from '@vitejs/plugin-legacy'
import defineOptions from 'unplugin-vue-define-options/vite'
import unocss from 'unocss/vite'

// https://vitejs.dev/config/

function getPlugins(command: string) {
  return [
    vue(),
    unocss(),
    defineOptions(),
    vueJsx(),
    purgeIcons(),
    autoComponents({
      dirs: ['src/components', 'src/layouts'],
      resolvers: [NaiveUiResolver()],
      dts: true
    }),
    eslintPlugin({
      shouldLint: (path) => /\/src\/[^\?\r\n]*\.(vue|tsx?)$/.test(path),
      eslintOptions: {
        cache: false
      }
    }),
    viteMockServe({
      mockPath: 'src/mock',
      localEnabled: command === 'serve',
      prodEnabled: command !== 'serve',
      //  这样可以控制关闭mock的时候不让mock打包到最终代码内
      injectCode: `
          import { setupProdMockServer } from './mock/useMock'
          setupProdMockServer()
        `
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
}

export default ({ command }): UserConfigExport => ({
  plugins: getPlugins(command),
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src/')
      }
    ]
  },
  server: {
    port: 8000,
    host: true,
    open: true
  },
  build: {
    sourcemap: false
  }
})
