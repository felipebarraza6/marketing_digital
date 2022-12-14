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

  return(
    <div>
      <Row>
        <Col span={24}>
          <Typography.Title>Solicitudes</Typography.Title>
        </Col>
        <Col span={12}>
          <Table />
        </Col>
        <Col span={12} style={{paddingLeft:'40px'}}>
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
