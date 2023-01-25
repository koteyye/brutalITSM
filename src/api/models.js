import {baseUrl} from "@/shared/path-names";

export const fetchTrabl = async () => {
    const response = await fetch(`${baseUrl}/trabls?status=В работе`)
    return await response.json()
}

export const fetchTrablById = async (id) => {
    const response = await fetch(`${baseUrl}/trabls?id=${id}`)
    return await response.json()
}

export const fetchTrablsArch = async () => {
    const response = await fetch(`${baseUrl}/trabls?status=Закрыт`)
    return await response.json()
}