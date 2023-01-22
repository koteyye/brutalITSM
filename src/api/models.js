const baseURL = 'http://localhost:3000'

export const fetchTrabl = async () => {
    const response = await fetch(`${baseURL}/trabls`)
    return await response.json()
}

export const fetchTrablById = async (id) => {
    const response = await fetch(`${baseURL}/trabls?id=${id}`)
}

export const fetchTrablByStatus = async (status) => {
    const response = await fetch(`${baseURL}/trabls?status=${status}`)
}