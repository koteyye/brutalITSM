import {useFetchConfig, useFetch} from "@/use/fetch";
import {ref} from 'vue'
import {service} from "@/shared/path-names";
import {useErrorToast} from "@/plugins/toasts/toasts";

export async function useMe() {
    const {fetchConfig} = useFetchConfig('GET')
    const loaded = ref(false)
    const result = ref(null)

    try {
        const {response: me, request} = useFetch(`${service.userService}/auth/me`, fetchConfig)


        if (!loaded.value) {
            await request()
            loaded.value = true
        }

        result.value = me.value
    } catch(err) {
        useErrorToast('Срок твоего пребывания во мне закончен!')
    }

    return {result}
}