import {userServiceUrl} from "@/shared/path-names";


export const fetchUser = async () => {
    const response = await fetch(`${userServiceUrl}/api/users`)
    return await response.json()
}

export const fetchUserById = async (id) => {
    const response = await fetch(`${userServiceUrl}/api/users/${id}`)
    return await response.json()
}