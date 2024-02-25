import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import VueSweetalert2 from 'vue-sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

library.add(faEye, faEyeSlash)

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueSweetalert2)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
