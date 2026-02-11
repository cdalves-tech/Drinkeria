import { createRouter, createWebHistory } from 'vue-router'
import DrinksView from '../src/views/DrinksView.vue'
import OfertasView from '../src/views/OfertasView.vue'
import KitsView from '../src/views/KitsView.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
      {
        path: '/',
        name: 'inicio'

      },

      {
      path: '/drinks', 
      name: 'drinks', 
      component: DrinksView
    },
    { 
      path: '/ofertas', 
      name: 'ofertas', 
      component: OfertasView
    },
    { 
      path: '/kits', 
      name: 'kits', 
      component: OfertasView
    },

  ]
})

export default router