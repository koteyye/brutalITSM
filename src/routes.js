import {registerRoutes, RoutesNames} from "@/shared";
import {router} from "@/plugins/router";

const routes = [
    {
        path: '/',
        name: RoutesNames.Main,
        component: () => import('./components/main-page/main-page.vue')
    },
    {
        path: '/Trabls',
        name: RoutesNames.Trabls,
        component: () => import('./components/brutal-trabls/brutal-trabls.vue')
    },
    {
        path: '/TrablsItem/:id',
        name: RoutesNames.TrablsItem,
        component: () => import('./components/brutal-trabls/brutal-trabls-item/brutal-trabls-item.vue')
    },
    {
        path: '/CatalogTrabl',
        name: RoutesNames.CatalogTrabl,
        component: () => import('./components/brutal-catalog-trabl/brutal-catalog-trabl.vue')
    },
    {
        path: '/Feedback',
        name: RoutesNames.Feedback,
        component: () => import('./components/brutal-feedback/brutal-feedback.vue')
    },
    {
        path: '/AntiRating',
        name: RoutesNames.AntiRating,
        component: () => import('./components/brutal-antirating/brutal-antirating.vue')
    },
    {
        path: '/CatalogTrabl/ServiceItem/:id',
        name: RoutesNames.ServiceItem,
        component: () => import('./components/brutal-catalog-trabl/brutal-select-trabl/brutal-select-trabl.vue')
    },
    {
        path: '/createTrabl/:id',
        name: RoutesNames.CreateTrabl,
        component: () => import('./components/brutal-catalog-trabl/brutal-create-trabl/brutal-create-trabl.vue')
    }
]

registerRoutes(router, routes)