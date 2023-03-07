import {useErrorToast} from "@/plugins/toasts/toasts";
import {useMe} from "@/use/me";


export async function authGuard(to, from, next) {
    const requireAuth = to.meta.auth
    const requireRole = to.meta.role
    const currentUser = localStorage.getItem('token')
    if (requireAuth && !currentUser) {
        next('/auth')
        useErrorToast('Ты не вошел в систему, идиот!')
    } else {
        const {me} = await useMe()
        if (requireRole) {
            const roles = to.meta.roles
            const roleList = Object.values(me.value.roleList)
            const requireRoles = roles.some(r => roleList)
            if (requireRoles) {
                next()
            } else {
                from()
                useErrorToast('У тебя нет прав, идиот!')
            }
        } else {
            next()
        }

    }
}