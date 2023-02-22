import {fetchAuth} from "@/api/auth";
import {watch, ref} from "vue";

export default function useAuth(login, password) {
    const postAuth = ref(null)

    const setAuth = async () => {
        postAuth.value = await fetchAuth()
    }

    watch(login || password, setAuth)

    return {
        postAuth
    }
}