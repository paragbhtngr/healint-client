import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '@/MainPage'
import SettingsPage from '@/SettingsPage'

// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/settings',
      name: 'SettingsPage',
      component: SettingsPage
    }
  ]

})
