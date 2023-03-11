import {ref} from 'vue'

export function useFetchConfig(met) {
    const token = localStorage.getItem('token')
    const fetchConfig = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
        method: `${met}`,
        credentials: 'include',
    }

    return {fetchConfig}
}

export function useFetch(url, options) {
    const response = ref()
    const request = async () => {
        const res = await fetch(url, options)
        response.value = await res.json()
    }



    return {response, request}
}