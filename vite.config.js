import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path'
import {
  createSvgIconsPlugin
} from 'vite-plugin-svg-icons'
import {
  defineConfig,
  loadEnv
} from 'vite'
const config = loadEnv('development', './')
console.log('查看环境变量', config)
// http://127.0.0.1:4001
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // 选项写法
      // '/api': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // },
      // // 选项写法
      [config.VITE_API_BASE_URL]: {
        target: config.VITE_APP_BASE_SERVER,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // Proxying websockets or socket.io
      // '/socket.io': {
      //   target: 'ws://localhost:3000',
      //   ws: true
      // }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.vue', '.jsx', '.tsx', '.json']
  },
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    })
  ],
  // server:{
  //   hmr:{
  //     overlay:false
  //   }
  // }
})