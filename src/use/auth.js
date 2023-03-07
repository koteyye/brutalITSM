import {useFetch} from "@/use/fetch";
import {userServiceUrl} from "@/shared/path-names";
import {onErrorCaptured, ref} from 'vue'

export async function useAuth(init) {
    const errorMessage = ref('')
    const invalid = 'sql: no rows in result set'
    const options = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(init)
    }
    const error = ref('')

    const loaded = ref(false)
    const {response: token, request} = useFetch(`${userServiceUrl}/auth/sign-in`, options)

    if (!loaded.value) {
        await request()
        loaded.value = true
    }

    if (token.value.message === invalid) {
        errorMessage.value = 'Неверно введен логин или пароль, идиот!'
        }
    else {
        errorMessage.value = 'В настоящий момент сервис недоступен'
        }


    return {token, errorMessage}
}