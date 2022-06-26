const { createApp } = Vue

import bookApp from './views/book-app.cmp.js'

const options = {
    template: `
    <book-app />
    `,
    components: {
        bookApp,
    },
  

}

const app = createApp(options)


app.mount('#app')
