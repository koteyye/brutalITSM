import { onMounted, ref, $ref, watch} from "vue";

export default function useFilters(getValue) {
    const getStatuses = ref([])



    const setStatuses = () => {
                getStatuses.value = new Set(getValue.value)
        console.log(getStatuses)
    }

    onMounted(() => {
        setStatuses()
    })


    return {
        getStatuses,
        setStatuses
    }
}