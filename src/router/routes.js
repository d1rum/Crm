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
// Customer
import CreateCustomer from "../pages/customer/create";
import CustomerList from "../pages/customer/index";
import EditCustomer from "../pages/customer/edit";
// Admin
import CreateAdmin from "../pages/admin/create";
import AdminList from "../pages/admin/index";
import EditAdmin from "../pages/admin/edit";
// Blog
import CreateBlog from "../pages/blog/create";
import BlogList from "../pages/blog/index";
import EditBlog from "../pages/blog/edit";
// Team
import CreateTeam from "../pages/team/create";
import TeamList from "../pages/team/index";
import EditTeam from "../pages/team/edit";
// Faq
import CreateFaq from "../pages/faq/create";
import FaqList from "../pages/faq/index";
import EditFaq from "../pages/faq/edit";
// Product
import CreateProduct from "../pages/product/create";
import ProductList from "../pages/product/index";
import EditProduct from "../pages/product/edit";
import PriorityProduct from "../pages/product/priority";
import VariantProduct from "../pages/product/variant";

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
    // Slider
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
    // Collection
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
    // Customer
    {
        path: '/admin/create-customer',
        name: 'admin-create-customer',
        component: CreateCustomer,
        meta: {
            title: ' admin create customer',
        }
    },
    {
        path: '/admin/customer-list',
        name: 'admin-customer-list',
        component: CustomerList,
        meta: {
            title: ' admin customer list',
        }
    },
    {
        path: '/admin/edit-customer/:id',
        name: 'admin-edit-customer',
        component: EditCustomer,
        meta: {
            title: ' admin edit customer',
        }
    },
    // Admin
    {
        path: '/admin/create',
        name: 'admin-create',
        component: CreateAdmin,
        meta: {
            title: ' admin create admin',
        }
    },
    {
        path: '/admin/list',
        name: 'admin-list',
        component: AdminList,
        meta: {
            title: ' admin admin list',
        }
    },
    {
        path: '/admin/edit/:id',
        name: 'admin-edit',
        component: EditAdmin,
        meta: {
            title: ' admin edit admin',
        }
    },
    // Blog
    {
        path: '/admin/create-blog',
        name: 'admin-create-blog',
        component: CreateBlog,
        meta: {
            title: ' admin create blog',
        }
    },
    {
        path: '/admin/blog-list',
        name: 'admin-blog-list',
        component: BlogList,
        meta: {
            title: ' admin blog list',
        }
    },
    {
        path: '/admin/edit-blog/:id',
        name: 'admin-edit-blog',
        component: EditBlog,
        meta: {
            title: ' admin edit blog',
        }
    },
    // Team
    {
        path: '/admin/create-team',
        name: 'admin-create-team',
        component: CreateTeam,
        meta: {
            title: ' admin create team',
        }
    },
    {
        path: '/admin/team-list',
        name: 'admin-team-list',
        component: TeamList,
        meta: {
            title: ' admin team list',
        }
    },
    {
        path: '/admin/edit-team/:id',
        name: 'admin-edit-team',
        component: EditTeam,
        meta: {
            title: ' admin edit team',
        }
    },
    // Faq
    {
        path: '/admin/create-faq',
        name: 'admin-create-faq',
        component: CreateFaq,
        meta: {
            title: ' admin create faq',
        }
    },
    {
        path: '/admin/faq-list',
        name: 'admin-faq-list',
        component: FaqList,
        meta: {
            title: ' admin faq list',
        }
    },
    {
        path: '/admin/edit-faq/:id',
        name: 'admin-edit-faq',
        component: EditFaq,
        meta: {
            title: ' admin edit faq',
        }
    },
    // Product
    {
        path: '/admin/create-product',
        name: 'admin-create-product',
        component: CreateProduct,
        meta: {
            title: ' admin create product',
        }
    },
    {
        path: '/admin/product-list',
        name: 'admin-product-list',
        component: ProductList,
        meta: {
            title: ' admin product list',
        }
    },
    {
        path: '/admin/edit-product/:id',
        name: 'admin-edit-product',
        component: EditProduct,
        meta: {
            title: ' admin edit product',
        }
    },
    {
        path: '/admin/priority-product/:id',
        name: 'admin-priority-product',
        component: PriorityProduct,
        meta: {
            title: ' admin priority product',
        }
    },
    {
        path: '/admin/variant-product/:id',
        name: 'admin-variant-product',
        component: VariantProduct,
        meta: {
            title: ' admin variant product',
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