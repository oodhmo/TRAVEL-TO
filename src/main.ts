import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import VCalendar from 'v-calendar';
import Paginate from "vuejs-paginate-next";
import VueSplide from '@splidejs/vue-splide'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const pinia = createPinia()
const app = createApp(App);

pinia.use(piniaPluginPersistedstate)
app.use(pinia).use(router).use(VueSplide).use(Paginate).use(BootstrapVue3).use(VCalendar, {}).mount('#app')
