import {useErrorToast} from "@/plugins/toasts/toasts";
import {useMe} from "@/use/me";

export const userInfo = {}

export async function authGuard(to, from, next) {
    const requireAuth = to.meta.auth
    const requireRole = to.meta.role
    const currentUser = localStorage.getItem('token')
    if (requireAuth && !currentUser) {
        next('/auth')
        useErrorToast('Ты не вошел в систему, идиот!')
    } else {
        const {result} = await useMe()
        userInfo.value = result.value
        if (requireRole) {
            const roles = to.meta.roles
            const roleList = Object.values(result.value.roleList)
            if (checkRole(roleList, roles)) {
                next()
            } else {
                next('/')
                useErrorToast('У тебя нет прав, идиот')
            }
        } else {
            next()
        }

    }
}

function checkRole(roleList, roles) {
    for(let i=0; i<roleList.length; i++){
        if(roles.indexOf(roleList[i]) === -1) return false;
    }
    return true
}