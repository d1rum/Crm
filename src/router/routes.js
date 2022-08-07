import Vue from 'vue'
import Router from "vue-router";


// Auth
import admin_login from './views/account/login';
import admin_logout from './views/account/logout';
// Home
import admin from './views/home'

//stock-transfer
import stocktransfer from "../pages/StockTransfer/stocktransfer";

// Slider
import CreateSlider from "../pages/slider/create";
import SliderList from "../pages/slider/index";
import EditSlider from "../pages/slider/edit";
// Collection
import CreateCollection from "../pages/collection/create";
import CollectionList from "../pages/collection/index";
import EditCollection from "../pages/collection/edit";

Vue.use(Router)
const routes = [
    { path: '', redirect: { name: 'admin_login' }},
    {
        path: '/admin',
        component: admin,
        name: 'admin',

    },
    // Auth Login
    {
        path: '/admin/login',
        name: 'admin-login',
        component: admin_login,
        meta: {
            title: ' admin login',
        }
    },
    // Auth Logout
    {
        path: '/admin/logout',
        name: 'admin-logout',
        component: admin_logout,
        meta: {
            title: ' admin logout',
        }
    },
    // Stock Transfer
    {
        path: '/admin/stock-transfer',
        name: 'admin-stock-transfer',
        component: stocktransfer,
        meta: {
            title: ' admin stock transfer',
        }
    },
    //Slider
    {
        path: '/admin/create-slider',
        name: 'admin-create-slider',
        component: CreateSlider,
        meta: {
            title: ' admin create slider',
        }
    },
    {
        path: '/admin/slider-list',
        name: 'admin-slider-list',
        component: SliderList,
        meta: {
            title: ' admin slider list',
        }
    },
    {
        path: '/admin/edit-slider/:id',
        name: 'admin-edit-slider',
        component: EditSlider,
        meta: {
            title: ' admin edit slider',
        }
    },
    //Collection
    {
        path: '/admin/create-collection',
        name: 'admin-create-collection',
        component: CreateCollection,
        meta: {
            title: ' admin create collection',
        }
    },
    {
        path: '/admin/collection-list',
        name: 'admin-collection-list',
        component: CollectionList,
        meta: {
            title: ' admin collection list',
        }
    },
    {
        path: '/admin/edit-collection/:id',
        name: 'admin-edit-collection',
        component: EditCollection,
        meta: {
            title: ' admin edit collection',
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