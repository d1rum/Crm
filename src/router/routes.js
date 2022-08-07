import Vue from 'vue'
import Router from "vue-router";


// Auth
import admin_login from './views/account/login';
import admin_logout from './views/account/logout';
// Home
import admin from './views/home'

//stock-transfer
import stocktransfer from "../pages/StockTransfer/stocktransfer";

//Slider
import CreateSlider from "../pages/slider/create";
import SliderList from "../pages/slider/index";


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
    //stock-transfer

    {
        path: '/admin/stock-transfer',
        name: 'admin-stock-transfer',
        component: stocktransfer,
        meta: {
            title: ' admin logout',
        }
    },

    //Slider
    {
        path: '/admin/create-slider',
        name: 'admin-create-slider',
        component: CreateSlider,
        meta: {
            title: ' admin logout',
        }
    },
    {
        path: '/admin/slider-list',
        name: 'admin-slider-list',
        component: SliderList,
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