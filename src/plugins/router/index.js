import {createRouter, createWebHistory} from "vue-router";
import {authGuard} from "@/plugins/router/auth-guard";

export const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({top: 0, left: 0}),
    routes: []
})

router.beforeEach(authGuard)