import { fetchTrabl, fetchTrablById } from '@/api/models'
import { onMounted, ref, watch } from 'vue'

export default function useModels(getIdRef) {
    const getTrabls = ref([])
    const getTrablsById = ref([])

    const setTrabls = async () => {
        getTrabls.value = await fetchTrabl()
    }

    const setTrablsById = async () => {
        getTrablsById.value = await fetchTrablById(getIdRef.value)
    }

    onMounted(() => {
        setTrabls()
    })

    watch(getIdRef, setTrablsById)

    return {
        getTrabls,
        getTrablsById,
        setTrabls,
        setTrablsById
    }
}



