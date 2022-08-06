export default [{
        path: '/',
        meta: {
            authRequired: true
        },
        name: 'home',
        component: () => import('./views/home'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/account/login'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./views/account/register'),
    },

    {
        path: '/logout',
        name: 'logout',
        meta: {
            authRequired: true,
        },
    },

    // {
    //     path: '/pages/blank-page',
    //     name: 'Blank page',
    //     component: () => import('./views/pages/blank'),
    //     meta: {
    //         authRequired: true,
    //     }
    // },

]