import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user/list',
    name: 'user_list',
    component: () => import('../views/UserList.vue')
  },
  {
    path: '/user/add',
    name: 'user_add',
    component: () => import('../views/UserAdd.vue')
  },
  {
    path: '/user/edit/:userId',
    name: 'user_edit',
    component: () => import('../views/UserEdit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
