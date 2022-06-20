import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'
import Form from '../views/Form.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/form',
      name: 'form',
      component: Form
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
  ]
})

export default router
