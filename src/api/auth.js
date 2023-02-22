import {userServiceUrl} from "@/shared/path-names";
import { ref } from 'vue'


export const fetchAuth = async (login, password) => {
    const data = {login: login, password: password}
    const authResult = ref()

    const response = await fetch(`${userServiceUrl}/auth/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        authResult.value = false
        return authResult
    }
    return await response.json()
}