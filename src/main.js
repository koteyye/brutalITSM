import { createApp } from 'vue'
import App from './App.vue'
import {store} from './store'
import {router} from "@/plugins/router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons"
import './assets/styles/main.scss';
import {Toaster} from '@meforma/vue-toaster';
import {routes} from './routes'
import {v4 as uuid4} from 'uuid';
import Toast from "vue-toastification"
import "./assets/styles/toast.scss"

library.add(fas, far)


const init = async () => {
    const app = createApp(App)
        .use(router)
        .use(store)
        .use(Toaster)
        .use(uuid4)
        .use(Toast, {icon: false, hideProgressBar: true})
        .component('fa', FontAwesomeIcon)
    await router.isReady()
    app.mount('#app')
}
init()
