import { POST_LOGIN, GET, POST, DELETE, DOWNLOAD ,INSTANCE  } from "./config"
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

const retrieveCampaignAdm = async(uuid) => {
  const request = await GET(`advertising_campaigns/${uuid}/`)
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

const UpdateAdvertisingCampaign = async(field, value, uuid) => {      

  const token = JSON.parse(localStorage.getItem('token') || null)
  const options = {
    headers: {        
        'content-type': 'multipart/form-data',
        Authorization: `Token ${token}`
    }
  }  

  let formdata = new FormData()
  formdata.append(field, value)  
  const rq = await INSTANCE.patch(`advertising_campaigns/${uuid}/`, formdata, options).then((response) => {
  })
  return rq 

}

const listBranchs = async() => {

  const request = await GET(`branch_officces/`)
  return request
}

const newBranch = async(data) => {
  const request = await POST(`branch_officces/`, data)
  return request
}

const deleteBranch = async(id) => {
  const request = await DELETE(`branch_officces/${id}/`)
  return request
}

const deleteUser = async(id) => {
  const rq = await DELETE(`users/${id}/`)
  return rq
}

const downloadFileAdvertisement = async()=> {
  const rq = await DOWNLOAD(`advertising_campaignsxlsx/`)
  return rq.data
}


const endpoints = {
    authenticated: login,
    admins: {
      list: listAdmins
    },
    clients: {
      create: createClient,
      list: listClients,
      delete: deleteUser
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
      list: listCampaignAdm,
      update: UpdateAdvertisingCampaign,
      retrieve: retrieveCampaignAdm,
      downloadReport: downloadFileAdvertisement    
    },
    advertising_campaignscl:{
      list: listCampaignCl,
      update: UpdateAdvertisingCampaign,
      retrieve: retrieveCampaignAdm
    },
    branch_offices: {
      list: listBranchs,
      create: newBranch,
      delete: deleteBranch
    }
}

export default endpoints
