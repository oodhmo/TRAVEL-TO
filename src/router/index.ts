import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TourView from '../views/TourView.vue'
import CultureView from '../views/CultureView.vue'
import LeisureView from '../views/LeisureView.vue'
import TourDetailView from '../views/TourDetailView.vue'
import CultureDetailView from '../views/CultureDetailView.vue'
import LeisureDetailView from '../views/LeisureDetailView.vue'
import ContentDetail from '../views/ContentDetail.vue';
import SearchView from '../views/SearchView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tour',
    name: 'tour',
    component: TourView
  },
  {
    path: '/culture',
    name: 'culture',
    component: CultureView
  },
  {
    path: '/leisure',
    name: 'leisure',
    component: LeisureView
  },
  {
    path: '/tour/detail/:type/:id',
    name: 'tourdetail',
    component: TourDetailView
  },
  {
    path: '/culture/detail/:type/:id',
    name: 'culturedetail',
    component: CultureDetailView
  },
  {
    path: '/leisure/detail/:type/:id',
    name: 'leisuredetail',
    component: LeisureDetailView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/detail/:type/:id',
    name: 'contentDetail',
    component: ContentDetail
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
