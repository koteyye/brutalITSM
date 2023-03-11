import {useFetchConfig, useFetch} from "@/use/fetch";
import {reactive, ref, watch} from 'vue'
import {service} from "@/shared/path-names";

export const searchObj = {
    job: 'job',
    org: 'org',
}

export async function useSearch(searchOptions = {}) {
    const err = ref('')
    const result = ref([])

    const {fetchConfig} = useFetchConfig('GET')
    const loaded = ref(false)

    const {response: searchResult, request} = useFetch(`${searchOptions.value.service}/api/search/${searchOptions.value.searchObject}/${searchOptions.value.query}`, fetchConfig)

    if (!loaded.value) {
        await request()
        loaded.value = true
    }

    result.value = searchResult.value

    if (result.value === null) {
        err.value = "object not found"
    }

    return {
        result,
        err
    }
}