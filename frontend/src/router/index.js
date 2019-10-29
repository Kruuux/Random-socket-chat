import Vue from 'vue'
import VueRouter from 'vue-router'

import homePage from '../views/homePage'
import mainApp from '../views/mainApp'

import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: homePage },
  { path: '/app', component: mainApp, beforeEnter: (from, to, next) => {
      if(store.state.nickname) {
        next();
      } else {
        next('/')
      }
    } 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
