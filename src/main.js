import {
    createApp
} from 'vue'
import './style.css'
import App from './App.vue'
import './assets/common.less'
import 'normalize.css/normalize.css'
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/SvgIcon.vue'

// import DataVVue3 from '@kjgl77/datav-vue3'
// app.use(DataVVue3)
const app = createApp(App)
app.component("svg-icon",SvgIcon)
app.mount('#app')
