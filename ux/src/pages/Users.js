import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, 
          Form, Input, Button, Select, 
          Table, notification, Modal } from 'antd'

import endpoints from '../api/endpoints'

import {  validate  } from 'rut.js'

const Users = () => {
  
  const [rutOk, setRutOk] = useState(false)
  const [form] = Form.useForm()

  const [data, setData] = useState(null)
  const [update, setUpdate] = useState(0)
  const [viewForm, setViewForm] = useState(true)
  const [branchs, setBranchs] = useState([])

  const user = JSON.parse(localStorage.getItem('user') || null)

  const onFinish = async(values) => {
    values = {
      ...values,
      password_confirmation: values.password,
      type_user: 'ADM',
      //branch_office_default: user.branch_office_default.id
    }
    const rq = await endpoints.clients.create(values).then(()=> {
      form.resetFields()
      setUpdate(update+1)
      notification.success({message:'CLIENTE CREADO CORRECTAMENTE'})
    }).catch((x)=> {
      notification.error({message:'NO SE HA PODIDO CREAR EL CLIENTE'})
    })

  }

  const getClients = async() => {
    const rq = await endpoints.admins.list().then((x)=> {
      setData(x.data.results)
    })
    const rq2 = await endpoints.branch_offices.list().then((x)=> {
      setBranchs(x.data.results)
    })
  }

  useEffect(()=> {
    getClients()
  }, [update])


  return(
    <div>
    {console.log(branchs)}
      <Row>
        <Col span={18}>
          <Table dataSource={data} columns={[
            { dataIndex:'first_name', title:'Nombre' },
            { dataIndex:'last_name', title:'Apellido' },
            { dataIndex:'email', title:'Email' },
            { title:'Sucursal', render: (x)=> x.branch_office_default.name_branch },
            { dataIndex:'dni', title:'Rut' },
            { render: (x) => <Button danger type='primary' onClick={async()=>{
              const rq = await endpoints.clients.delete(x.username).then((x)=> {
                setUpdate(update+1)
                setRutOk(false)
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
            <Form.Item label='Apellido' name='last_name' rules={[{ required: true , message:'Campo obligatorio'}, { min: 5, message:'Asegúrese de que este campo tenga al menos 5 caracteres.' }]} >
              <Input />
            </Form.Item>
            <Form.Item label='Usuario' name='username' rules={[{ required: true , message:'Campo obligatorio'}, { min: 4, message:'Asegúrese de que este campo tenga al menos 4 caracteres.' }]} >
              <Input />
            </Form.Item>

            <Form.Item label='Email' name='email' rules={[{ required: true , message:'Campo obligatorio'}, { type: 'email', message:'Debes ingresar un email valido' }]}  >
              <Input />
            </Form.Item>
            <Form.Item label='Rut' name='dni' rules={[{ required: true , message:'Campo obligatorio'}]} onChange={(e)=>{
                if(validate(e.target.value) && !rutOk && e.target.value.length >= 8 ){
                  setRutOk(validate(e.target.value))
                } else{
                  setRutOk(false)
                }
            }}  >
              <Input />
            </Form.Item>
            <Form.Item label='Sucursal' name='branch_office_default' rules={[{ required: true , message:'Campo obligatorio'}]} >
              <Select placeholder='Selecciona una sucursal...'>
                {branchs.map((x)=><Select.Option value={x.id}>{x.name_branch}</Select.Option>)}
              </Select>
            </Form.Item>

            <Form.Item label='Contraseña' name='password' rules={[{ required: true , message:'Campo obligatorio'},{min:8, message:'Asegúrese de que la contraseña  al menos 8 caracteres'}]}  >
              <Input />
            </Form.Item>
          <Form.Item>
            <Button type='primary' disabled={!rutOk} htmlType='submit'>CREAR</Button>
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


export default Users 
