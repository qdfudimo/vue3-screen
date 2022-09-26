import vue from '@vitejs/plugin-vue'
import {
  visualizer
} from 'rollup-plugin-visualizer'
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
    //   visualizer({
    //     open:true,  //注意这里要设置为true，否则无效
    //     gzipSize:true,
    //     brotliSize:true
    // }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    })
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // key自定义 value[] 插件同步package.json名称 或 src/相对路径下的指定文件 （自己可以看manualChunks ts类型）
        manualChunks: {
          // vue vue-router合并打包
          vue: ['vue'],
          echarts: ['echarts'],
         "@kjgl77/datav-vue3": ['@kjgl77/datav-vue3'],
      }
        // manualChunks(id) { 
        //    // 最小化拆分包
        //   if (id.includes('node_modules')) {
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
        //   }
        // }
      }
    }
  }
  // server:{
  //   hmr:{
  //     overlay:false
  //   }
  // }
})