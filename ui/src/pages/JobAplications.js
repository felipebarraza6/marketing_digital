import React from 'react'
import { Typography, Row, Col, 
          Form, Input, Button, Table } from 'antd'

const JobAplications = () => {

  const [form] = Form.useForm()
  const onSend = (values) => {
    values = {
      ...values,
      owner_adm: 1,
      owner_client: 1
    }
    console.log(values)
  }

  const data = [
    { 
      admin: "Karen",
      "sucursal": "Cocotero",
      "cliente": "David",
      "descripcion": "Campaña realiza para incrementar ventas 24 de diciembre, idealmente durabilidad de una semana",
      "presupuesto": "$10.000",
      "estado":"rechazada"
    },
    { 
      "admin": "Karen",
      "sucursal": "Cocotero",
      "cliente": "Luis",
      "descripcion": "Campaña realiza para incrementar ventas de ropa el 24 de diciembre",
      "presupuesto": "$10.000",
      "estado":"aprobada"
    }

  ]

  return(
    <div>
      <Row>
        <Col span={24}>
          <Typography.Title>Solicitudes</Typography.Title>
        </Col>
        <Col span={16}>
          <Table dataSource={data} columns={[
            { dataIndex:'admin', title:'Administrador' },
            { dataIndex:'sucursal', title:'Sucursal' },
            { dataIndex:'cliente', title:'Cliente' },
            { dataIndex:'descripcion', title:'Descripcion' },
            { dataIndex:'presupuesto', title:'Presupuesto' },
            { title:'Estado', dataIndex:'estado' }
          ]} />
        </Col>
        <Col span={8} style={{paddingLeft:'40px'}}>
          <Form onFinish={onSend} form={form} layout='vertical'>
            <Form.Item label='Titulo' name='title'>
              <Input />
            </Form.Item>
            <Form.Item label='Presupuesto' name='budget'>
              <Input />
            </Form.Item>
            <Form.Item label='Descripcion' name='description'>
              <Input.TextArea />
            </Form.Item>
            <Form.Item label='Fecha inicio' name='start_date'>
              <Input />
            </Form.Item>
            <Form.Item label='Fecha termino' name='end_data'>
              <Input />
            </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>CREAR</Button>
            <Button danger type='primary' onClick={()=> form.resetFields()} style={{marginLeft:'10px'}}>LIMPIAR</Button>
          </Form.Item>
            </Form> 
        </Col>
      </Row>
    </div>
  )
}


export default JobAplications
