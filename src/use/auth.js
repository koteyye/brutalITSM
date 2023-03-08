import {useFetch} from "@/use/fetch";
import {userServiceUrl} from "@/shared/path-names";
import {ref} from 'vue'
import {useSuccessToast} from "@/plugins/toasts/toasts";

export async function useAuth(init) {
    const errorMessage = ref('')
    const invalid = 'sql: no rows in result set'
    const completeAuth = ref(false)
    const options = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(init)
    }

    const loaded = ref(false)
    const {response: token, request} = useFetch(`${userServiceUrl}/auth/sign-in`, options)

    if (!loaded.value) {
        await request()
        loaded.value = true
    }

    if (!token.value.token) {
        if (token.value.message === invalid) {
            errorMessage.value = 'Неверно введен логин или пароль, идиот!'
        }
        else {
            errorMessage.value = 'В настоящий момент сервис недоступен'
        }
    }
    else {
        localStorage.setItem('token', token.value.token)
        setTimeout(completeAuth.value = true, 1000)

        useSuccessToast('Ты успешно вошел в меня')
    }


    return {token, errorMessage, completeAuth}
}