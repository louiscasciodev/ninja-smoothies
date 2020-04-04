import Vue from 'vue';
import VueRouter from 'vue-router';
import { AddSmoothie, EditSmoothie } from '@/components/smoothies';
import firebase from 'firebase';
import store from '@/store';
import ViewProfile from '@/components/geoloc/ViewProfile.vue';
import HomeMap from '../views/HomeMap.vue';
import HomeSmoothies from '../views/HomeSmoothies.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomeSmoothies',
    component: HomeSmoothies,
  },
  {
    path: '/map',
    name: 'HomeMap',
    component: HomeMap,
  },
  {
    path: '/add',
    name: 'AddSmoothie',
    component: AddSmoothie,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/edit/:smoothie_slug',
    name: 'EditSmoothie',
    component: EditSmoothie,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile/:id',
    name: 'ViewProfile',
    component: ViewProfile,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
// check to see if route requires auth
  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
  // check auth state of user
    const user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      // no user signed in, redirect to login
      store.dispatch('user/setValue', { loginForm: true });
    }
  } else next();
});

export default router;
