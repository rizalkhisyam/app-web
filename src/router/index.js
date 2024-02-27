import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/stores'
import jsCookie from 'js-cookie'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../components/HelloWorld.vue'),
      meta: {
        requiresAuth: true
      },
      // children:[{
      //   path: 'main',
      //   name: 'main',
      //   components: () => import('../components/dashboard/Main.vue'),
      //   meta: {
      //     requiresAuth: true
      //   },
      // }]
    }
  ]
})

router.beforeEach((to, from) => {
  const token = jsCookie.get('TOKEN')
  if(to.meta.requiresAuth == true){
    if(token == undefined){
      return { name: 'login' }
    }else {
      return true;
    }
  }

  if(to.name == 'login' && token !==undefined){
    return { name: 'dashboard' }
  }

  if(to.name == null){
    return {name: 'login'}
  }
})

export default router
