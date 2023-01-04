import {createRouter, createWebHistory} from "vue-router";

export const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({top: 0, left: 0}),
    routes: []
})