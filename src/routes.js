import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// pages
import Home from '~/pages/Home/Home.vue'
import Finder from '~/pages/Finder/Finder.vue'
import notFound from '~/pages/404/404.vue'

// routering
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/finder',
      name: 'finder',
      component: Finder,
    },
    {
      path: '*',
      name: 'notFound',
      component: notFound,
    },
  ],
});