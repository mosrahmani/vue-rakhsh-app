import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/scss/bootstrap.scss'
import './assets/sass/style.sass'
import Vuelidate from 'vuelidate'
import Toasted from 'vue-toasted'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import Pagination from 'vue-pagination-2'
import vSelect from 'vue-select'
import VTooltip from 'v-tooltip'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(Toasted, {
  duration: 2000,
  className: 'custom-toasted'
})
Vue.component('date-picker', VuePersianDatetimePicker)
Vue.component('pagination', Pagination)
Vue.component('v-select', vSelect)
Vue.use(VTooltip)

var users = []
users = JSON.parse(localStorage.getItem('users')) || []
Vue.prototype.$users = users

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
