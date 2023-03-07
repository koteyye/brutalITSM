import {POSITION, useToast} from "vue-toastification";

const toast = useToast()

export function useInfoToast(mess) {
    toast.info(`${mess}`, {
        position: POSITION.BOTTOM_CENTER,
        timeout: 4000,
    })
}

export function useErrorToast(mess) {
    toast.error(`${mess}`, {
        position: POSITION.BOTTOM_CENTER,
        timeout: 4000,
    })
}

export function useSuccessToast(mess) {
    toast.success(`${mess}`, {
        position: POSITION.BOTTOM_CENTER,
        timeout: 4000,
    })
}