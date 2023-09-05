const headers = {
    'Content-Type': 'application/json'
}
  
const get = async (url) => {
    const res = await fetch(url, {
        method: 'GET',
        headers
    })
    return await res.json()
}

export const http = { get }