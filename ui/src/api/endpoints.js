import { POST_LOGIN, GET, POST  } from "./config"

const login = async(data) =>{
    
    const request = await POST_LOGIN('users/login/', {
        email: data.email,
        password: data.password
    })

    return request.data
}

const createClient = async(data) => { 
  const request = await POST('users/signup/', data)
  return request
}

const listClients = async() => {
  const request = await GET(`users`)
  return request
}

const endpoints = {
    authenticated: login,
    clients: {
      create: createClient,
      list: listClients
    }
}

export default endpoints
