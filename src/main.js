import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import VueSweetalert2 from 'vue-sweetalert2';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueSweetalert2)
app.mount('#app')
