import Vue from 'vue';
import VueRouter from 'vue-router';
import { AddSmoothie, EditSmoothie } from '@/components/smoothies';
import HomeMap from '../views/HomeMap.vue';
import HomeSmoothies from '../views/HomeSmoothies.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomeMap',
    component: HomeMap,
  }, {
    path: '/smoothies',
    name: 'HomeSmoothies',
    component: HomeSmoothies,
  }, {
    path: '/add',
    name: 'AddSmoothie',
    component: AddSmoothie,
  }, {
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
