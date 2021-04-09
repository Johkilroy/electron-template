import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (!to.matched || to.matched.length === 0) {
        router.replace('/error')
    } else {
        next()
    }
})

export default router
