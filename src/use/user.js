import {useFetch, useFetchConfig} from "@/use/fetch";
import {ref} from "vue";
import {service} from "@/shared/path-names";

export async function useUser() {
    const {fetchConfig} = useFetchConfig('GET')

    const loaded = ref(false)
    const {response: userList, request} = useFetch(`${service.userService}/api/users/`, fetchConfig)

    if (!loaded.value) {
        await request()
        loaded.value = true
    }

    return {userList}
}
