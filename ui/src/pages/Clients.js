import React, { useEffect } from 'react'
import { Typography, Row, Col, 
          Form, Input, Button, 
          Table, notification } from 'antd'

import endpoints from '../api/endpoints'

const Clients = () => {
  
  const [form] = Form.useForm()
  
  const user = JSON.parse(localStorage.getItem('user') || null)

  const onFinish = async(values) => {
    values = {
      ...values,
      password_confirmation: values.password,
      type_user: 'CL',
      branch_office_default: user.branch_office_default.id
    }
    console.log(values)
    const rq = await endpoints.clients.create(values).then(()=> {
      form.resetFields()
      notification.success({message:'CLIENTE CREADO CORRECTAMENTE'})
    }).catch((x)=> {
      notification.error({message:'NO SE HA PODIDO CREAR EL CLIENTE'})
    })

  }
const data = [
    { 
      nombre: "David",
      apellido: "Urbina",
      empresa: "Arepinga",
      dni: "26478839-0",
    },
    { 
      nombre: "Luis",
      apellido: "Mejitas",
      empresa: "Outlet de las Marcas",
      dni: "26854963-9",
    },
  ]


  const getClients = async() => {
    const rq = await endpoints.clients.list().then((x)=> {
      console.log(x)
    })
  }

  useEffect(()=> {
    getClients()
  }, [])


  return(
    <div>
      <Row>
        <Col span={24}>
          <Typography.Title>Clientes</Typography.Title>
        </Col>
        <Col span={12}>
          <Table dataSource={data} columns={[
            { dataIndex:'nombre', title:'Nombre' },
            { dataIndex:'apellido', title:'Apellido' },
            { dataIndex:'empresa', title:'Empresa' },
            { dataIndex:'dni', title:'Rut' },
          ]} />
        </Col>
        <Col span={12} style={{paddingLeft:'40px'}}>
          <Form onFinish={onFinish} layout='vertical' form={form}>
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
            <Button danger type='primary' style={{marginLeft:'10px'}}>LIMPIAR</Button>
          </Form.Item>
          </Form> 
        </Col>
      </Row>
    </div>
  )
}


export default Clients 
