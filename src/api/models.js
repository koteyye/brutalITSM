const baseURL = 'http://localhost:3000'

export const fetchTrabl = async () => {
    const response = await fetch(`${baseURL}/trabls?status=В работе`)
    return await response.json()
}

export const fetchTrablById = async (id) => {
    const response = await fetch(`${baseURL}/trabls?id=${id}`)
}

export const fetchTrablsArch = async () => {
    const response = await fetch(`${baseURL}/trabls?status=Закрыт`)
    return await response.json()
}