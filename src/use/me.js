import {useFetchConfig, useFetch} from "@/use/fetch";
import {ref} from 'vue'
import {userServiceUrl} from "@/shared/path-names";

export async function useMe() {
    const {fetchConfig} = useFetchConfig('GET')
    const loaded = ref(false)
    const {response: me, request} = useFetch(`${userServiceUrl}/auth/me`, fetchConfig)

    if (!loaded.value) {
        await request()
        loaded.value = true
    }

    return {me}
}