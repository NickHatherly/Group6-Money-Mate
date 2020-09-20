import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },

    //this is what determines the path to your page, please copy this and edit as needed
    //place your copy below this one
    {
        path: '/Textinput',
        name: 'Textinput',
        component: () => import(/* webpackChunkName: "textinput" */ '../views/Textinput.vue')
    },
    //PLACE HERE
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

export default router
