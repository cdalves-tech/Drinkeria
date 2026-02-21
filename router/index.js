import { createRouter, createWebHistory } from 'vue-router'
import DrinksView from '../src/views/DrinksView.vue'
import OfertasView from '../src/views/OfertasView.vue'
import KitsView from '../src/views/KitsView.vue'
import HomeView from '../src/components/layout/HomeView.vue'
import ProductDetailView from '../src/views/ProductDetailView.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
      {
        path: '/',
        name: 'inicio',
        component: HomeView

      },

      {
      path: '/drinks', 
      name: 'drinks', 
      component: HomeView
    },
    { 
      path: '/ofertas', 
      name: 'ofertas', 
      component: OfertasView
    },
    { 
      path: '/kits', 
      name: 'kits', 
      component: KitsView
    },
    {
      path: '/produto/:id',
      name: 'produto-detalhe',
      component: ProductDetailView
    },

  ]
})

export default router
