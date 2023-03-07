import {ref} from 'vue'

const token = localStorage.getItem('token')
export const fetchConfig = {
    headers: {
        Authorization: 'Bearer ' + token,
    },
    method: 'GET',
    credentials: 'include',
}

export function useFetch(url, options) {
    const response = ref()

    const request = async () => {
        const res = await fetch(url, options)
        response.value = await res.json()
    }


    return {response, request}
}