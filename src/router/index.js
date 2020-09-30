import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('@/views/Login.vue')
  // },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/views/List.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
