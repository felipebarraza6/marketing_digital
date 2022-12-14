import axios from 'axios'
import { notification } from 'antd'
import { CloudDownloadOutlined } from '@ant-design/icons'

const BASE_URL = 'http://localhost:8000'


export const INSTANCE = axios.create({
    baseURL: BASE_URL,
})

export const POST_LOGIN = async (endpoint ,data) =>{

    const request = await INSTANCE.post(endpoint, data)

    return request
}

export const GET = async (endpoint) =>{

    const token = JSON.parse(localStorage.getItem('token') || null)
    const options = {
        headers: {
            Authorization: `Token ${token}`
        }
    }
    const response = await INSTANCE.get(endpoint, options)

    return response
}

export const POST = async (endpoint, data) =>{

    const token = JSON.parse(localStorage.getItem('token') || null)

    const options = {
        headers: {
            Authorization: `Token ${token}`
        }
    }

    const response = INSTANCE.post(endpoint, data, options)

    return response
}

export const DELETE = async (endpoint) =>{

    const token = JSON.parse(localStorage.getItem('token') || null)

    const options = {
        headers: {
            Authorization: `Token ${token}`
        }
    }

    const response = INSTANCE.delete(endpoint, options)

    return response
}

export const DOWNLOAD = async(endpoint) => {

    const token = JSON.parse(localStorage.getItem('token')) 
    const download = {
      responseType: 'blob',
      headers: {        
          Authorization: `Token ${token}`
      }
    }

    const request = await INSTANCE.get(endpoint, download).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${new Date()}.xlsx`)
        document.body.appendChild(link)
        link.click()
    })
    

    
    notification.open({
        description: `Archivo descargado exitosamente!`,
        placement: 'topRight',
        icon: <CloudDownloadOutlined style={{color:'#69802A'}} />

    })

    return request
}
