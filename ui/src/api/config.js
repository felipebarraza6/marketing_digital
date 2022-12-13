import axios from 'axios'

const BASE_URL = 'http://localhost:8000/'



export const Axios = axios.create({
    baseURL: BASE_URL,
})




export const POST_LOGIN = async (endpoint, data) =>{
    const request = await Axios.post(endpoint, data)
    return request
}


export const GET = async (endpoint) => {
    const token = JSON.parse(localStorage.getItem('token'))
    
    const options = {
        headers: {
            Authorization: `Token ${token}`
        }
    }
    const request = await Axios.get(endpoint, options)
    return request
}

