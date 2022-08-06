import Vue from 'vue'
import Router from "vue-router";


//Auth

import login from './views/account/login';

import home from './views/home'
Vue.use(Router)
const routes = [
    { path: '', redirect: { name: 'Login' }},
    {
        path: '/home',
        component: home,
        name: 'home',
        // children: [
        //     {
        //         path: 'default',
        //         name: 'default',
        //         component: SamplePage,
        //         meta: {
        //             title: 'Default Dashboard | Endless - Premium Admin Template',
        //         }
        //     },
        //     {
        //         path: 'ecommerce',
        //         name: 'ecommerce',
        //         component: SamplePage,
        //         meta: {
        //             title: 'Ecommerce Dashboard | Endless - Premium Admin Template',
        //         }
        //
        //     },
        //
        // ]
    },
    //Aut route
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: ' login',
        }
        // path: '/auth',
        // component: login,
        // children: [
        //     {
        //         path: 'login',
        //         name: 'Login',
        //         component: Login,
        //         meta: {
        //             title: ' login | Cuba - Premium Admin Template',
        //         }
        //     },
        //     {
        //         path: 'register',
        //         name: 'register',
        //         component: Register,
        //         meta: {
        //             title: ' Register | Cuba - Premium Admin Template',
        //         }
        //     },
        //     {
        //         path: 'logout',
        //         name: 'Logout',
        //         component: Logout,
        //     }
        // ]
    },


];
const router = new Router({
    routes,
    base: '/',
    mode: 'history',
    linkActiveClass: "active",
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
});

export default router