import { POST_LOGIN, GET, DOWNLOAD  } from "./config"

const login = async(data) =>{
    
    const request = await POST_LOGIN('users/login/', {
        email: data.email,
        password: data.password
    })

    return request.data
}



const endpoints = {
    authenticated: login,
}

export default endpoints
