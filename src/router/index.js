import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ProductView from '../components/ProductView.vue'
import CategoryView from '../components/CategoryView.vue'
import jsCookie from 'js-cookie'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: HomeView,
      meta: {
        requiresAuth: true
      },
      children:[
        {
          path: 'products',
          name: 'products',
          component: ProductView,
          meta: {
            requiresAuth: true
          },
        },

        {
          path: 'categories',
          name: 'category',
          component: CategoryView,
          meta: {
            requiresAuth: true
          },
        }
      ]
    },
    
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
