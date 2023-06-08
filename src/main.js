import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueSweetalert2 from 'vue-sweetalert2'
import VueApexCharts from 'vue-apexcharts'
import router from './router/routes'
import store from '@/state/store'
import vco from "v-click-outside"

import "@/design/index.scss";

import Sparkline from 'vue-sparklines'

// User Class Imported
import User from './helpers/authservice/User';
window.User = User

// Import Notification Class
import Notification from './helpers/authservice/Notification';
window.Notification = Notification

// Sweet Alert Start
import Swal from 'sweetalert2'
import axios from "axios";
window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});
window.Toast = Toast;



// if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
//   initFirebaseBackend(firebaseConfig);
// } else {
//   configureFakeBackend();
// }

Vue.use(BootstrapVue);

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(VueMask)
Vue.use(VueSweetalert2)
Vue.use(require('vue-chartist'))
Vue.use(vco)
Vue.use(Sparkline)
window.Reload = new Vue();


Vue.component('apexchart', VueApexCharts)

axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest'}
axios.defaults.baseURL =  process.env.HTTP_URL;
Vue.prototype.$http = axios;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


