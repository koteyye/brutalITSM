import {fetchUser, fetchUserById} from "@/api/users";
import {onMounted, ref, watch} from "vue";

export default function users(idRef) {
    const getUsers = ref([])
    const getUserById = ref(null)

    const setUsers = async () => {
        getUsers.value = await fetchUser
    }

    const setUserById = async () => {
        getUserById.value = await fetchUserById(idRef.value)
    }


    onMounted(() => {
        setUsers()
    })

    watch(idRef, setUserById)

    return {
        getUsers,
        getUserById,
        setUsers,
        setUserById
    }
}