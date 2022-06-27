const { createApp } = Vue
import { router } from './router.js';
import appHeader from './cmps/book-header.cmp.js'

import bookApp from './views/book-app.cmp.js'
import appHome from './views/book-home.cmp.js'

const options = {
    template: `
    <app-header/>
    <router-view />
    `,
    components: {
        bookApp,
        appHeader,
        appHome,
    },


}

const app = createApp(options)
app.use(router)

app.mount('#app')
