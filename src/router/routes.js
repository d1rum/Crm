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

// Variant
import CreateVariant from "../pages/variant/create";
import VariantList from "../pages/variant/index";
import EditVariant from "../pages/variant/edit";

// Warehouse
import CreateWarehouse from "../pages/warehouse/create";
import WarehouseList from "../pages/warehouse/index";
import EditWarehouse from "../pages/warehouse/edit";

// Service
import CreateService from "../pages/service/create";
import ServiceList from "../pages/service/index";
import EditService from "../pages/service/edit";

// Referance
import CreateReferance from "../pages/referance/create";
import ReferanceList from "../pages/referance/index";
import EditReferance from "../pages/referance/edit";

// Project
import CreateProject from "../pages/project/create";
import ProjectList from "../pages/project/index";
import EditProject from "../pages/project/edit";

// Employee
import CreateEmployee from "../pages/employee/create";
import EmployeeList from "../pages/employee/index";
import EditEmployee from "../pages/employee/edit";

// Supplier
import CreateSupplier from "../pages/supplier/create";
import SupplierList from "../pages/supplier/index";
import EditSupplier from "../pages/supplier/edit";

// About Us
import CreateAbout from "../pages/about/create";
import AboutList from "../pages/about/index";
import EditAbout from "../pages/about/edit";

// Campaign
import CreateCampaign from "../pages/campaign/create";
import CampaignList from "../pages/campaign/index";
import EditCampaign from "../pages/campaign/edit";

// Image Resize
import EditImageResize from "../pages/imageResize/edit";

// Site Setting
import EditSiteSetting from "../pages/sitesettings/edit";

// Setting
import EditSetting from "../pages/settings/edit";

// Backup
import BackupList from "../pages/backup/index";

//Category
import CategoryList from "../pages/category/index";

//Sub-Category
import SubcategoryList from "../pages/subcategory/index";


//Color
import ColorList from "../pages/color/index"

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

    // Category
    {
        path: '/admin/category-list',
        name: 'admin-category-list',
        component: CategoryList,
        meta: {
            title: ' admin category list',
        }
    },

    // Sub-Category
    {
        path: '/admin/subcategory-list',
        name: 'admin-subcategory-list',
        component: SubcategoryList,
        meta: {
            title: ' admin subcategory list',
        }
    },

    // Color
    {
        path: '/admin/color-list',
        name: 'admin-color-list',
        component: ColorList,
        meta: {
            title: ' admin color list',
        }
    },

    // Variant
    {
        path: '/admin/create-variant',
        name: 'admin-create-variant',
        component: CreateVariant,
        meta: {
            title: ' admin create variant',
        }
    },
    {
        path: '/admin/variant-list',
        name: 'admin-variant-list',
        component: VariantList,
        meta: {
            title: ' admin variant list',
        }
    },
    {
        path: '/admin/edit-variant/:id',
        name: 'admin-edit-variant',
        component: EditVariant,
        meta: {
            title: ' admin edit variant',
        }
    },
    // Warehouse
    {
        path: '/admin/create-warehouse',
        name: 'admin-create-warehouse',
        component: CreateWarehouse,
        meta: {
            title: ' admin create warehouse',
        }
    },
    {
        path: '/admin/warehouse-list',
        name: 'admin-warehouse-list',
        component: WarehouseList,
        meta: {
            title: ' admin warehouse list',
        }
    },
    {
        path: '/admin/edit-warehouse/:id',
        name: 'admin-edit-warehouse',
        component: EditWarehouse,
        meta: {
            title: ' admin edit warehouse',
        }
    },
    // Service
    {
        path: '/admin/create-service',
        name: 'admin-create-service',
        component: CreateService,
        meta: {
            title: ' admin create service',
        }
    },
    {
        path: '/admin/service-list',
        name: 'admin-service-list',
        component: ServiceList,
        meta: {
            title: ' admin service list',
        }
    },
    {
        path: '/admin/edit-service/:id',
        name: 'admin-edit-service',
        component: EditService,
        meta: {
            title: ' admin edit service',
        }
    },
    // Referance
    {
        path: '/admin/create-referance',
        name: 'admin-create-referance',
        component: CreateReferance,
        meta: {
            title: ' admin create referance',
        }
    },
    {
        path: '/admin/referance-list',
        name: 'admin-referance-list',
        component: ReferanceList,
        meta: {
            title: ' admin referance list',
        }
    },
    {
        path: '/admin/edit-referance/:id',
        name: 'admin-edit-referance',
        component: EditReferance,
        meta: {
            title: ' admin edit referance',
        }
    },
    // Project
    {
        path: '/admin/create-project',
        name: 'admin-create-project',
        component: CreateProject,
        meta: {
            title: ' admin create project',
        }
    },
    {
        path: '/admin/project-list',
        name: 'admin-project-list',
        component: ProjectList,
        meta: {
            title: ' admin project list',
        }
    },
    {
        path: '/admin/edit-project/:id',
        name: 'admin-edit-project',
        component: EditProject,
        meta: {
            title: ' admin edit project',
        }
    },
    // Employee
    {
        path: '/admin/create-employee',
        name: 'admin-create-employee',
        component: CreateEmployee,
        meta: {
            title: ' admin create employee',
        }
    },
    {
        path: '/admin/employee-list',
        name: 'admin-employee-list',
        component: EmployeeList,
        meta: {
            title: ' admin employee list',
        }
    },
    {
        path: '/admin/edit-employee/:id',
        name: 'admin-edit-employee',
        component: EditEmployee,
        meta: {
            title: ' admin edit employee',
        }
    },
    // Supplier
    {
        path: '/admin/create-supplier',
        name: 'admin-create-supplier',
        component: CreateSupplier,
        meta: {
            title: ' admin create supplier',
        }
    },
    {
        path: '/admin/supplier-list',
        name: 'admin-supplier-list',
        component: SupplierList,
        meta: {
            title: ' admin supplier list',
        }
    },
    {
        path: '/admin/edit-supplier/:id',
        name: 'admin-edit-supplier',
        component: EditSupplier,
        meta: {
            title: ' admin edit supplier',
        }
    },
    // About Us
    {
        path: '/admin/create-about',
        name: 'admin-create-about',
        component: CreateAbout,
        meta: {
            title: ' admin create about',
        }
    },
    {
        path: '/admin/about-list',
        name: 'admin-about-list',
        component: AboutList,
        meta: {
            title: ' admin about list',
        }
    },
    {
        path: '/admin/edit-about/:id',
        name: 'admin-edit-about',
        component: EditAbout,
        meta: {
            title: ' admin edit about',
        }
    },
    // Campaign
    {
        path: '/admin/create-campaign',
        name: 'admin-create-campaign',
        component: CreateCampaign,
        meta: {
            title: ' admin create campaign',
        }
    },
    {
        path: '/admin/campaign-list',
        name: 'admin-campaign-list',
        component: CampaignList,
        meta: {
            title: ' admin campaign list',
        }
    },
    {
        path: '/admin/edit-campaign/:id',
        name: 'admin-edit-campaign',
        component: EditCampaign,
        meta: {
            title: ' admin edit campaign',
        }
    },
    // Image Resize
    {
        path: '/admin/edit-image-resize/:id',
        name: 'admin-edit-image-resize',
        component: EditImageResize,
        meta: {
            title: ' admin edit image resize',
        }
    },
    // Site Settings
    {
        path: '/admin/edit-site-setting/:id',
        name: 'admin-edit-site-setting',
        component: EditSiteSetting,
        meta: {
            title: ' admin edit site setting',
        }
    },
    // Settings
    {
        path: '/admin/edit-setting/:id',
        name: 'admin-edit-setting',
        component: EditSetting,
        meta: {
            title: ' admin edit setting',
        }
    },
    // Backup
    {
        path: '/admin/backup-list',
        name: 'admin-backup-list',
        component: BackupList,
        meta: {
            title: ' admin backup list',
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