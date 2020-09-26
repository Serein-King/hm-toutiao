import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 通用样式
import './styles/base.less'
import './styles/iconfont.css'
// 适配
import 'amfe-flexible'
// 引入vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 全局注册组件
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
// 将axios 挂载到vue 原型上去
import axios from 'axios'
// 优化接口地址
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.config.productionTip = false
// 全局的把vant的组件都导入好了
Vue.use(Vant)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
