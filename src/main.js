import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 通用样式
import './styles/base.less'
import './styles/iconfont.css'
// 适配
import 'amfe-flexible'
// 引入vant 组件库
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
// 引入过滤器
import './utils/filter'
// 全局注册组件
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmNavItem from './components/HmNavItem.vue'
// 将axios 挂载到vue 原型上去
import axios from 'axios'
// 优化接口地址
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'

// 给axios配置请求拦截器
axios.interceptors.request.use(function (config) {
  // config指的是请求的配置信息
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// // 配置响应拦截器
axios.interceptors.response.use(function (response) {
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 1. 提示验证失败
    // 2. 跳转登录页面
    // 3. 清楚失效信息message
    Toast.fail(message)
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }
  return response
})
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navitem', HmNavItem)
Vue.config.productionTip = false
// 全局的把vant的组件都导入好了
Vue.use(Vant)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
