const menuItems = [{
    id: 1,
    label: "Main",
    isTitle: true
},
    {
        id: 2,
        label: 'Dashboard',
        icon: 'ti-home',
        badge: {
            variant: "primary",
        },
        link: '/admin'
    },
    {
        id: 3,
        label: 'Stock Management',

        isTitle: true
    },
    {
        id: 4,
        label: 'Stock Transfer',
        icon: 'ti-package',
        subItems: [
            {
                id: 5,
                label: 'Stock Transfer',
                icon: 'ti-home',
                link: '/admin/stock-transfer'
            },
            {
                id: 6,
                label: 'Stock Transfer List',
                icon: 'ti-home',
                link: ''
            },
            {
                id: 7,
                label: 'Out of Stock',
                icon: 'ti-home',
                link: ''
            },
        ]
    },
    {
        id: 8,
        label: 'Site Management',
        icon: 'ti-package',
        isTitle: true

    },

    {
        id: 9,
        label: 'Site Management',
        icon: 'ti-package',

        subItems: [
            {
                id: 1011,
                label: 'Customer',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 1111,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-customer'
                    },
                    {
                        id: 1211,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/customer-list'
                    },

                ]
            },
            {
                id: 10,
                label: 'Slider',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 11,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-slider'
                    },
                    {
                        id: 12,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/slider-list'
                    },

                ]
            },
            {
                id: 13,
                label: 'Category',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 14,
                        label: 'Create',
                        icon: 'ti-home',
                        link: ''
                    },
                    {
                        id: 15,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/category-list'
                    },

                ]
            },
            {
                id: 16,
                label: 'Sub Category',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 17,
                        label: 'Create',
                        icon: 'ti-home',
                        link: ''
                    },
                    {
                        id: 18,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/subcategory-list'
                    },

                ]
            },
            {
                id: 19,
                label: 'Collection',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 20,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-collection'
                    },
                    {
                        id: 21,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/collection-list'
                    },

                ]
            },
            {
                id: 22,
                label: 'Product',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 23,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-product'
                    },
                    {
                        id: 24,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/product-list'
                    },

                ]
            },
            {
                id: 25,
                label: 'Variant',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 26,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-variant'
                    },
                    {
                        id: 27,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/variant-list'
                    },

                ]
            },
            {
                id: 28,
                label: 'BLog',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 29,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-blog'
                    },
                    {
                        id: 30,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/blog-list'
                    },

                ]
            },
            {
                id: 31,
                label: 'About Us',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 32,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-about'
                    },
                    {
                        id: 33,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/about-list'
                    },

                ]
            },
            {
                id: 34,
                label: 'FAQ',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 35,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-faq'
                    },
                    {
                        id: 36,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/faq-list'
                    },

                ]
            },
            {
                id: 37,
                label: 'Service',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 38,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-service'
                    },
                    {
                        id: 39,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/service-list'
                    },

                ]
            },
            {
                id: 40,
                label: 'Team',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 41,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-team'
                    },
                    {
                        id: 42,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/team-list'
                    },

                ]
            },
            {
                id: 43,
                label: 'Project',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 44,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-project'
                    },
                    {
                        id: 45,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/project-list'
                    },

                ]
            },
            {
                id: 46,
                label: 'Referance',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 47,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-referance'
                    },
                    {
                        id: 48,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/referance-list'
                    },

                ]
            },
            {
                id: 461,
                label: 'Campaing',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 471,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-campaign'
                    },
                    {
                        id: 481,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/campaign-list'
                    },

                ]
            },
            {
                id: 49,
                label: 'Contact',
                icon: 'ti-home',
                link: ''
            },
            {
                id: 50,
                label: 'Newslatter',
                icon: 'ti-home',
                link: ''
            },
        ]
    },

    {
        id: 51,
        label: 'Private Management',
        icon: 'ti-package',

        isTitle: true
    },

    {
        id: 52,
        label: 'Private Management',
        icon: 'ti-package',

        subItems: [
            {
                id: 53,
                label: 'Size',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 54,
                        label: 'Create',
                        icon: 'ti-home',
                        link: ''
                    },
                    {
                        id: 55,
                        label: 'List',
                        icon: 'ti-home',
                        link: ''
                    },

                ]
            },
            {
                id: 56,
                label: 'Color',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 57,
                        label: 'Create',
                        icon: 'ti-home',
                        link: ''
                    },
                    {
                        id: 58,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/color-list'
                    },

                ]
            },
            {
                id: 59,
                label: 'Unit',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 60,
                        label: 'Create',
                        icon: 'ti-home',
                        link: ''
                    },
                    {
                        id: 61,
                        label: 'List',
                        icon: 'ti-home',
                        link: ''
                    },

                ]
            },
            {
                id: 123,
                label: 'Note',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 123213,
                        label: 'Create',
                        icon: 'ti-home',
                        link: ''
                    },
                    {
                        id: 31231,
                        label: 'List',
                        icon: 'ti-home',
                        link: ''
                    },

                ]
            },
            {
                id: 213123,
                label: 'Task',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 312,
                        label: 'Create',
                        icon: 'ti-home',
                        link: ''
                    },
                    {
                        id: 312313,
                        label: 'List',
                        icon: 'ti-home',
                        link: ''
                    },

                ]
            },
            {
                id: 12312,
                label: 'Warehouse',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 23424,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-warehouse'
                    },
                    {
                        id: 2342,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/warehouse-list'
                    },

                ]
            },
            {
                id: 234324,
                label: 'Admin',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 3242,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/Admin/create'
                    },
                    {
                        id: 2343242,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/Admin/list'
                    },

                ]
            },
            {
                id: 2343,
                label: 'Role',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 234324,
                        label: 'Create',
                        icon: 'ti-home',
                        link: ''
                    },
                    {
                        id: 23242,
                        label: 'List',
                        icon: 'ti-home',
                        link: ''
                    },

                ]
            },
            {
                id: 23432,
                label: 'Supplier',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 23423424,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-supplier'
                    },
                    {
                        id: 232422342,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/supplier-list'
                    },

                ]
            },
            {
                id: 2132131,
                label: 'Settings',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 345435351312,
                        label: 'Image Resize',
                        icon: 'ti-home',
                        link: '/admin/edit-image-resize/:id'
                    },
                    {
                        id: 3353453,
                        label: 'Site Settings',
                        icon: 'ti-home',
                        link: '/admin/edit-site-setting/:id'
                    },
                    {
                        id: 3534535,
                        label: 'Settings',
                        icon: 'ti-home',
                        link: '/admin/edit-setting/:id'
                    },
                    {
                        id: 34543535,
                        label: 'Google Maps',
                        icon: 'ti-home',
                        link: ''
                    },
                    {
                        id: 34543535,
                        label: 'Backup',
                        icon: 'ti-home',
                        link: '/admin/backup-list'
                    },

                ]
            },
            {
                id: 53453535,
                label: 'Employee',
                icon: 'ti-package',
                subItems: [
                    {
                        id: 345435345363,
                        label: 'Create',
                        icon: 'ti-home',
                        link: '/admin/create-employee'
                    },
                    {
                        id: 45654646464,
                        label: 'List',
                        icon: 'ti-home',
                        link: '/admin/employee-list'
                    },


                ]
            },
            {
                id: 53453535,
                label: 'Salary',
                icon: 'ti-package',
                link:'',
            },












        ]
    },
    {
        id: 535453453,
        label: 'Shipping Company',
        isTitle: true,

    },
    {
        id: 32432432,
        label: 'Shipping Company',
        icon: 'ti-package',
        subItems: [
            {
                id: 3453453564345,
                label: 'Create',
                icon: 'ti-home',
                link: ''
            },
            {
                id: 3454353,
                label: 'List',
                icon: 'ti-home',
                link: ''
            },

        ]
    },
    {
        id: 34535,
        label: 'Deci',
        icon: 'ti-package',
        subItems: [
            {
                id: 4564646456,
                label: 'Create',
                icon: 'ti-home',
                link: ''
            },
            {
                id: 4353535,
                label: 'List',
                icon: 'ti-home',
                link: ''
            },

        ]
    },
    {
        id: 3534543,
        label: 'Distance',
        icon: 'ti-package',
        subItems: [
            {
                id: 45646421,
                label: 'Create',
                icon: 'ti-home',
                link: ''
            },
            {
                id: 23243242,
                label: 'List',
                icon: 'ti-home',
                link: ''
            },

        ]
    },
    {
        id: 45654645646,
        label: 'Post Type',
        icon: 'ti-package',
        subItems: [
            {
                id: 5435353,
                label: 'Create',
                icon: 'ti-home',
                link: ''
            },
            {
                id: 3453453,
                label: 'List',
                icon: 'ti-home',
                link: ''
            },

        ]
    },
    {
        id: 2343242342,
        label: 'Service',
        icon: 'ti-package',
        subItems: [
            {
                id: 35655453,
                label: 'Create',
                icon: 'ti-home',
                link: ''
            },
            {
                id: 5453432,
                label: 'List',
                icon: 'ti-home',
                link: ''
            },

        ]
    },

    {
        id: 34546442,
        label: 'Payment',
        icon: 'ti-package',

        isTitle: true
    },
    {
        id: 3423432425,
        label: 'Payment Method',
        icon: 'ti-package',
        subItems: [
            {
                id: 456464564,
                label: 'Create',
                icon: 'ti-home',
                link: ''
            },
            {
                id: 5676564343,
                label: 'List',
                icon: 'ti-home',
                link: ''
            },

        ]
    },
    {
        id: 34534535,
        label: 'Iyzico',
        icon: 'ti-package',
        link: '',
    },
    {
        id: 566765735,
        label: 'Paypal',
        icon: 'ti-package',
        link: '',
    },
    {
        id: 3453453453,
        label: 'Report',
        icon: 'ti-package',

        isTitle: true
    },
    {
        id: 346586787686,
        label: 'Report',
        icon: 'ti-package',
        subItems: [
            {
                id: 5676575675,
                label: 'Search',
                icon: 'ti-package',
                link:'',

            },
            {
                id: 5464345345,
                label: 'General',
                icon: 'ti-package',
                link:'',

            },
            {
                id: 546547567,
                label: 'Daily',
                icon: 'ti-package',
                link:'',

            },
            {
                id: 6787762,
                label: 'Monthly',
                icon: 'ti-package',
                link:'',

            },
            {
                id: 64656756756,
                label: 'Yearly',
                icon: 'ti-package',
                link:'',

            },


        ]

    },




















]

export {
    menuItems
};