import Vue from 'vue'
import Router from "vue-router";


// Auth
import admin_login from './views/account/login';
import admin_logout from './views/account/logout';
// Home
import admin from './views/home'

Vue.use(Router)
const routes = [
    { path: '', redirect: { name: 'admin_login' }},
    {
        path: '/admin',
        component: admin,
        name: 'admin',
    },
    //Aut route
    {
        path: '/admin/login',
        name: 'admin-login',
        component: admin_login,
        meta: {
            title: ' admin login',
        }
    },
    {
        path: '/admin/logout',
        name: 'admin-logout',
        component: admin_logout,
        meta: {
            title: ' admin logout',
        }
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