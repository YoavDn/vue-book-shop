import bookApp from "./views/book-app.cmp.js"
import bookDetails from "./views/book-details.cmp.js"
import homePage from "./views/book-home.cmp.js"



const routes = [

    {
        path: '/',
        component: homePage,

    },
    {
        path: '/book',
        component: bookApp,
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    }
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})