import { POST_LOGIN, GET, POST, INSTANCE  } from "./config"
import { notification } from 'antd'

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
  const request = await GET(`users/?type_user=CL`)
  return request
}

const listAdmins = async() => {
  const request = await GET(`users/?type_user=ADM`)
  return request
}

const listJobApplications = async() => {
  const request = await GET('job_applications/')
  return request
}

const listJobApplicationsForClient = async() => {

  const user = JSON.parse(localStorage.getItem('user') || null)
  const request = await GET(`job_applications/?owner_client=${user.id}`)
  return request
}

const listCampaignAdm = async() => {

  const request = await GET(`advertising_campaigns/`)
  return request
}

const listCampaignCl = async() => {

  const user = JSON.parse(localStorage.getItem('user') || null)
  const request = await GET(`advertising_campaigns/?job_applitacion__owner_client=${user.id}`)
  return request
}



const updateJobApplications = async(field, value, uuid) => {      

  const token = JSON.parse(localStorage.getItem('token') || null)
  const options = {
    headers: {        
        'content-type': 'multipart/form-data',
        Authorization: `Token ${token}`
    }
  }  

  let formdata = new FormData()
  formdata.append(field, value)  
  const rq = await INSTANCE.patch(`job_applications/${uuid}/`, formdata, options).then((response) => {
  })
  return rq 

}

const createJobApplication = async(data) => {      

  const token = JSON.parse(localStorage.getItem('token') || null)
  const options = {
    headers: {        
        'content-type': 'multipart/form-data',
        Authorization: `Token ${token}`
    }
  }  

  let formdata = new FormData()
  formdata.append('title', data.title)  
  formdata.append('description', data.description)  
  formdata.append('budget', data.budget) 
  formdata.append('start_date', data.start_date) 
  formdata.append('end_data', data.end_data)  
  formdata.append('owner_client', data.owner_client) 
  formdata.append('payment', data.payment) 
  formdata.append('branch_office', data.branch_office) 


  const rq = await INSTANCE.post(`job_applications/`, formdata, options).then((response) => {
  })
  return rq 

}

const endpoints = {
    authenticated: login,
    admins: {
      list: listAdmins
    },
    clients: {
      create: createClient,
      list: listClients
    },
    job_applicationsadm: {
        list: listJobApplications,
        update: updateJobApplications,
    },
    job_applicationscl: {
        create: createJobApplication,
        list: listJobApplicationsForClient
    },
    advertising_campaignsadm:{
      list: listCampaignAdm
    },
    advertising_campaignscl:{
      list: listCampaignCl
    }
}

export default endpoints
