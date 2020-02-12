import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import '../assets/css/global.css'
import Edit from '../components/edit/Edit.vue'
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
// axios请求拦截
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
Vue.prototype.$http = axios
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit
  }
]

const router = new VueRouter({
  routes
})

export default router
