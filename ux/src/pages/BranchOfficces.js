import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, 
          Form, Input, Button, 
          Table, notification, Modal } from 'antd'

import endpoints from '../api/endpoints'


const BranchOfficces = () => {
  
  const [form] = Form.useForm()
  const [formu] = Form.useForm()

  const [data, setData] = useState(null)
  const [update, setUpdate] = useState(0)
  const [selectClient, setSelectClient] = useState(null)
  const [viewForm, setViewForm] = useState(true)

  const user = JSON.parse(localStorage.getItem('user') || null)

  const onFinish = async(values) => {
    values = {
      ...values,
      password_confirmation: values.password,
      type_user: 'CL',
      branch_office_default: user.branch_office_default.id,
      owner: user.id
    }
    const rq = await endpoints.branch_offices.create(values).then(()=> {
      form.resetFields()
      setUpdate(update+1)
      notification.success({message:'CLIENTE CREADO CORRECTAMENTE'})
    }).catch((x)=> {
      notification.error({message:'NO SE HA PODIDO CREAR EL CLIENTE'})
    })

  }

  const getClients = async() => {
    const rq = await endpoints.branch_offices.list().then((x)=> {
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
            { dataIndex:'name_branch', title:'Nombre' },
            { dataIndex:'dni_branch', title:'Rut' },
            { dataIndex:'commercial_business', title:'Giro' },
            { render: (x)=><Button danger type='primary' onClick={async()=> {
              const rq = await endpoints.branch_offices.delete(x.id).then((x)=> {
                setUpdate(update+1)
              })
            }}>Eliminar</Button> }
          ]} />
        </Col>
        <Col span={6} style={{paddingLeft:'40px'}}>
          {viewForm &&
          <Form onFinish={onFinish} layout='vertical'  form={form}>
            <Form.Item label='Nombre' name='name_branch'>
              <Input />
            </Form.Item>
            <Form.Item label='Rut' name='dni_branch'>
              <Input />
            </Form.Item>
            <Form.Item label='Giro' name='commercial_business'>
              <Input.TextArea rows={4} />
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


export default BranchOfficces 
