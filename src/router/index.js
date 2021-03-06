import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' }
]

const router = new VueRouter({
  routes
})

// 配置全局的路由守卫 判断是否有token
router.beforeEach((to, from, next) => {
  // console.log(to)
  const token = localStorage.getItem('token')
  if (to.name !== 'user' || token) {
    next()
  } else {
    router.push('/login')
  }
})

export default router
