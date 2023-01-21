import { fetchTrabl, fetchTrablById } from '@/api/models'
import { onMounted, ref, watch } from 'vue'

export default function useModels(getIdRef) {
    const getTrabls = ref([])
    const getStatus = ref([])
    const getTrablsById = ref([])

    const setTrabls = async () => {
        getTrabls.value = await fetchTrabl()
        let statuses = getTrabls.value.map(getTrabls => getTrabls.status + '')
        let uniqueStatus = new Set(statuses)
        getStatus.value = ([...uniqueStatus])
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
        setTrablsById,
        getStatus
    }
}



