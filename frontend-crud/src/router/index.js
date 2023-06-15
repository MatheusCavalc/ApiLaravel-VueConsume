import { createRouter, createWebHistory } from 'vue-router'

let authUser = localStorage.getItem("bearerToken") === null ? false : true

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Auth/LoginView.vue')
  }, {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Auth/RegisterView.vue')
  },
  {
    path: '/new-product',
    name: 'new_product',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewProduct.vue'),
    beforeEnter: (to, from, next) => {
      if (!authUser) {
        return next({
          name: 'login'
        })
      }

      next()
    }
  },
  {
    path: '/show-product/:id',
    name: 'show_product',
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewProduct.vue'),
  },
  {
    path: '/edit-product/:id',
    name: 'edit_product',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditProduct.vue'),
    beforeEnter: (to, from, next) => {
      if (!authUser) {
        return next({
          name: 'login'
        })
      }

      next()
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
