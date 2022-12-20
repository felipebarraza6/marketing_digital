import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, 
          Form, Input, Button, 
          Table, notification, Modal } from 'antd'

import endpoints from '../api/endpoints'


const Clients = () => {
  
  const [form] = Form.useForm()
  const [formu] = Form.useForm()

  const [data, setData] = useState(null)
  const [update, setUpdate] = useState(false)
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
      setUpdate(true)
      notification.success({message:'CLIENTE CREADO CORRECTAMENTE'})
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
          ]} />
        </Col>
        <Col span={6} style={{paddingLeft:'40px'}}>
          {viewForm &&
          <Form onFinish={onFinish} layout='vertical'  form={form}>
            <Form.Item label='Nombre' name='first_name'>
              <Input />
            </Form.Item>
            <Form.Item label='Apellido' name='last_name'>
              <Input />
            </Form.Item>
            <Form.Item label='Usuario' name='username'>
              <Input />
            </Form.Item>

            <Form.Item label='Email' name='email'>
              <Input />
            </Form.Item>
            <Form.Item label='Nombre empresa' name='name_enterprise'>
              <Input />
            </Form.Item>
            <Form.Item label='Rut' name='dni'>
              <Input />
            </Form.Item>
            <Form.Item label='Contraseña' name='password'>
              <Input />
            </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>CREAR</Button>
              <Button danger type='primary' style={{marginLeft:'10px'}} onClick={()=>form.resetFields()}>LIMPIAR</Button>
            
          </Form.Item>
          </Form>}
        </Col>
      </Row>
    </div>
  )
}


export default Clients 
