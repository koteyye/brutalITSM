import {fetchConfig, useFetch} from "@/use/fetch";
import {ref} from 'vue'
import {userServiceUrl} from "@/shared/path-names";

export async function useMe() {
    const options = fetchConfig

    const loaded = ref(false)
    const {response: me, request} = useFetch(`${userServiceUrl}/auth/me`, options)

    if (!loaded.value) {
        await request()
        loaded.value = true
    }

    console.log(me)

    return {me}
}