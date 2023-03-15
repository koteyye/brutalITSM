import {useFetch, useFetchConfig} from "@/use/fetch";
import {ref} from "vue";
import {service} from "@/shared/path-names";
import {useErrorToast, useInfoToast} from "@/plugins/toasts/toasts";

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

export async function useRole() {
    const {fetchConfig} = useFetchConfig('GET')


    const loaded = ref(false)
    const {response: roleList, request} = useFetch(`${service.userService}/api/users/roles`, fetchConfig)

    if (!loaded.value) {
        await request()
        loaded.value = true
    }

    return {roleList}
}

export async function createUser(init = {}) {
    const {fetchConfig} = useFetchConfig('POST')
    const err = ref('')

    fetchConfig.body = JSON.stringify(init)

    const loaded = ref(false)
    const {response: userId, request} = useFetch(`${service.userService}/api/users/create`, fetchConfig)

    if (!loaded.value) {
        await request()
        loaded.value = true
    }

    if (!userId.value.id) {
        err.value = 'Не удалось создать пользователя'
    }

    return {userId, err}

}

export async function deleteUser(id) {
    const {fetchConfig} = useFetchConfig('DELETE')
    const loaded = ref(false)
    const result = ref('')

    try{
        const {response: delResult, request} = useFetch(`${service.userService}/api/users/delete/${id}`, fetchConfig)
        if (!loaded.value) {
            await request()
            loaded.value = true
        }
        result.value = delResult.value
    } catch {
        useErrorToast('Не удалось удалить этого идиота')
    }
    return {result}
}



// async function clickOrder() {
//     const isValid = validateFields()
//     if (!isValid) {
//         errorMessage.value = 'Необходимо указать E-mail'
//         return
//     }
//     const data = { id: basketId.value, status: 'Оплата', email: email.value}
//     const response = await fetch(`${baseurl}/api/basket/change_status?token=${token.value}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data),
//     })
//     const json = await response.json()
//     basketId.value = json.id