import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, 
          Form, Input, Button, 
          Table, notification, Modal } from 'antd'

import endpoints from '../api/endpoints'
import {  validate  } from 'rut.js'


const Clients = () => {
  
  const [form] = Form.useForm()
  const [formu] = Form.useForm()

  const [data, setData] = useState(null)
  const [rutOk, setRutOk] = useState(false)
  const [update, setUpdate] = useState(0)
  const [selectClient, setSelectClient] = useState(null)
  const [viewForm, setViewForm] = useState(true)

  const user = JSON.parse(localStorage.getItem('user') || null)

  const onFinish = async(values) => {
    values = {
      ...values,
      password_confirmation: values.password,
      type_user: 'CL',
      branch_office_default: user.branch_office_default.id
    }
    const rq = await endpoints.clients.create(values).then(()=> {
      form.resetFields()
      setUpdate(update+1)
      notification.success({message:'CLIENTE CREADO CORRECTAMENTE'})
      setRutOk(false)
    }).catch((x)=> {
      notification.error({message:'NO SE HA PODIDO CREAR EL CLIENTE'})
    })

  }

  const getClients = async() => {
    const rq = await endpoints.clients.list().then((x)=> {
      setData(x.data.results)
    })
  }

  useEffect(()=> {
    getClients()
  }, [update])


  return(
    <div>
      <Row>
        <Col span={18}>
          <Table dataSource={data} columns={[
            { dataIndex:'first_name', title:'Nombre' },
            { dataIndex:'last_name', title:'Apellido' },
            { dataIndex:'email', title:'Email' },
            { dataIndex:'name_enterprise', title:'Empresa' },
            { dataIndex:'dni', title:'Rut' },
            { render: (x)=> <Button type='primary' danger onClick={async()=> {
              const rq = endpoints.clients.delete(x.username).then((x)=> {
                setUpdate(update+1)
              })
            }} >Eliminar</Button> }
          ]} />
        </Col>
        <Col span={6} style={{paddingLeft:'40px'}}>
          {viewForm &&
          <Form onFinish={onFinish} layout='vertical'  form={form}>
            <Form.Item label='Nombre' name='first_name' rules={[{ required: true , message:'Campo obligatorio'}, { min: 5, message:'Asegúrese de que este campo tenga al menos 5 caracteres.' }]}  >
              <Input />
            </Form.Item>
            <Form.Item label='Apellido' name='last_name' rules={[{ required: true , message:'Campo obligatorio'}, { min: 5, message:'Asegúrese de que este campo tenga al menos 5 caracteres.' }]}  >
              <Input />
            </Form.Item>
            <Form.Item label='Usuario' name='username' rules={[{ required: true , message:'Campo obligatorio'}, { min: 4, message:'Asegúrese de que este campo tenga al menos 4 caracteres.' }]}  >
              <Input />
            </Form.Item>

            <Form.Item label='Email' name='email' rules={[{ required: true , message:'Campo obligatorio'}, { type: 'email', message:'Debes ingresar un email valido' }]}  >
              <Input />
            </Form.Item>
            <Form.Item label='Nombre empresa' name='name_enterprise' rules={[{ required: true , message:'Campo obligatorio'}]}  >
              <Input />
            </Form.Item>
            <Form.Item label='Rut' name='dni' rules={[{ required: true , message:'Campo obligatorio'}]} onChange={(e)=>{
                if(validate(e.target.value) && !rutOk && e.target.value.length >= 8 ){
                  setRutOk(validate(e.target.value))
                } else{
                  setRutOk(false)
                }
            }} >
              <Input />
            </Form.Item>
            <Form.Item label='Contraseña' name='password' rules={[{ required: true , message:'Campo obligatorio'},{min:8, message:'Asegúrese de que la contraseña  al menos 8 caracteres'}]} >
              <Input />
            </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' disabled={!rutOk}>CREAR</Button>
            <Button danger type='primary' style={{marginLeft:'10px'}} onClick={()=>{
              form.resetFields()
              setRutOk(false)
            }}>LIMPIAR</Button>
{!rutOk && <p style={{marginTop:'10px', color:'red'}}>Debes ingresar un rut valido</p>}

          </Form.Item>
          </Form>}
        </Col>
      </Row>
    </div>
  )
}


export default Clients 
