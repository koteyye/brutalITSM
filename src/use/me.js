import {useFetchConfig, useFetch} from "@/use/fetch";
import {ref} from 'vue'
import {service} from "@/shared/path-names";

export async function useMe() {
    const {fetchConfig} = useFetchConfig('GET')
    const loaded = ref(false)
    const {response: me, request} = useFetch(`${service.userService}/auth/me`, fetchConfig)

    if (!loaded.value) {
        await request()
        loaded.value = true
    }

    if(!me.value) {
        localStorage.clear()
        location.reload()
    }


    return {me}
}