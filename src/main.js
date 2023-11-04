import {createApp} from 'vue'
import './style.css'
import App from './components/layout/Index.vue'
import router from "./router/index.js"
import Vant from 'vant'
import 'vant/lib/index.css'
import tools from "@/plus/tools.js";
import VueCookies from 'vue3-cookies'
import './theme/normal.css'
createApp(App)
    .use(router)
    .use(Vant)
    .use(tools)
    .use(VueCookies)
    .mount('#app')

