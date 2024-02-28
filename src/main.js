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
import { faArrowLeft, faArrowRight, faEdit, faEye, faEyeSlash, faHome, faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

axios.defaults.withCredentials=true;
axios.defaults.baseURL='http://127.0.0.1:8000'

library.add(faEye, faEyeSlash, faHome, faMagnifyingGlass, faTrash, faEdit, faArrowLeft, faArrowRight)

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueSweetalert2)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
