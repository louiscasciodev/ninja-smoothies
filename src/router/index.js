import Vue from 'vue';
import VueRouter from 'vue-router';
import { AddSmoothie, EditSmoothie } from '@/components';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add',
    name: 'AddSmoothie',
    component: AddSmoothie,
  },
  {
    path: '/edit/:smoothie_slug',
    name: 'EditSmoothie',
    component: EditSmoothie,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
