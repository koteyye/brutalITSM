import { fetchTrabl, fetchTrablById, fetchTrablsArch } from '@/api/models'
import { onMounted, ref, watch } from 'vue'

export default function useModels(idRef) {
    const getTrabls = ref([])
    const getTrablsArch = ref([])
    const getTrablsById = ref([])


    const setTrabls = async () => {
        getTrabls.value = await fetchTrabl()
    }

    const setTrablsArch = async () => {
        getTrablsArch.value = await fetchTrablsArch()
    }

    const setTrablsById = async () => {
        getTrablsById.value = await fetchTrablById(idRef.value)
    }



    onMounted(() => {
        setTrabls(), setTrablsArch()
    })

    watch(()=> idRef, setTrablsById)

    

    return {
        getTrabls,
        getTrablsById,
        getTrablsArch,
        setTrabls,
        setTrablsById,
        setTrablsArch
    }
}



