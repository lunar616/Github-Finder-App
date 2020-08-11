import './assets/scss/main.scss'

window.Vue = require('vue');
import App from './App.vue'
import router from'./routes'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')