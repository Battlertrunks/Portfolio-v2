import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/features/home/HomeView.vue'),
    meta: { title: 'Home' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/features/about/AboutView.vue'),
    meta: { title: 'About' },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/features/projects/ProjectsView.vue'),
    meta: { title: 'Projects' },
  },
  {
    path: '/experience',
    name: 'experience',
    component: () => import('@/features/experience/ExperienceView.vue'),
    meta: { title: 'Experience' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to) => {
    if (to.hash) {
      return { el: to.hash, top: 96, behavior: 'smooth' }
    }

    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | Gavin Szczesniak` : 'Gavin Szczesniak'
})

export default router
