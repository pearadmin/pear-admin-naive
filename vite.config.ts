import { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import windiCSS from 'vite-plugin-windicss'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
// import eslintPlugin from "@nabla/vite-plugin-eslint"
import autoComponents from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import purgeIcons from 'vite-plugin-purge-icons'

// https://vitejs.dev/config/

function getPlugins(command: string) {
  return [
    vue(),
    windiCSS(),
    vueJsx(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    purgeIcons(),
    autoComponents({
      resolvers: [NaiveUiResolver()],
      dts: true
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
    port: 3000,
    host: true,
    open: true
  }
})
