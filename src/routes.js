import {registerRoutes, RoutesNames} from "@/shared";
import {router} from "@/plugins/router";

const routes = [
    {
        path: '/',
        name: RoutesNames.Main,
        meta: {auth: true},
        component: () => import('./components/main-page/main-page.vue')
    },
    {
        path: '/Trabls',
        name: RoutesNames.Trabls,
        meta: {auth: true},
        component: () => import('./components/brutal-trabls/brutal-trabls.vue')
    },
    {
        path: '/TrablsItem/:id',
        name: RoutesNames.TrablsItem,
        meta: {auth: true},
        component: () => import('./components/brutal-trabls/brutal-trabls-item/brutal-trabls-item.vue')
    },
    {
        path: '/CatalogTrabl',
        name: RoutesNames.CatalogTrabl,
        meta: {auth: true},
        component: () => import('./components/brutal-catalog-trabl/brutal-catalog-trabl.vue')
    },
    {
        path: '/Feedback',
        name: RoutesNames.Feedback,
        meta: {auth: true},
        component: () => import('./components/brutal-feedback/brutal-feedback.vue')
    },
    {
        path: '/AntiRating',
        name: RoutesNames.AntiRating,
        meta: {auth: true},
        component: () => import('./components/brutal-antirating/brutal-antirating.vue')
    },
    {
        path: '/CatalogTrabl/ServiceItem/:id',
        name: RoutesNames.ServiceItem,
        meta: {auth: true},
        component: () => import('./components/brutal-catalog-trabl/brutal-select-trabl/brutal-select-trabl.vue')
    },
    {
        path: '/createTrabl/:id',
        name: RoutesNames.CreateTrabl,
        meta: {auth: true},
        component: () => import('./components/brutal-catalog-trabl/brutal-create-trabl/brutal-create-trabl.vue')
    },
    {
        path: '/admin',
        name: RoutesNames.AdminPanel,
        meta: {auth: true, role: true, roles: ['admin']},
        component: () => import('./components/brutal-admin-panel/brutal-admin-panel.vue')
    },
    {
        path: '/auth',
        name: RoutesNames.Auth,
        component: () => import('./components/brutal-auth/brutal-auth.vue')
    }
]


registerRoutes(router, routes)