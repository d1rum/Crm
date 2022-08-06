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
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDUFz_grdu36GXFm2dTi79oY9YHnqPr0Dk',
    libraries: 'places',
  },
  installComponents: true
})
Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


