import { createApp } from 'vue'
import App from './App.vue'
import {store} from './store'
import {router} from "@/plugins/router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import './assets/styles/main.scss';
import {Toaster} from '@meforma/vue-toaster';
import {routes} from './routes'
import {v4 as uuid4} from 'uuid';

library.add(fas)

const init = async () => {
    const app = createApp(App)
        .use(router)
        .use(store)
        .use(Toaster)
        .use(uuid4)
        .component('fa', FontAwesomeIcon)
    await router.isReady()
    app.mount('#app')
}
init()
