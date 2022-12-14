import React from 'react'
import { Typography, Row, Col, 
          Form, Input, Button, Table } from 'antd'

const Users = () => {
  return(
    <div>
      <Row>
        <Col span={24}>
          <Typography.Title>Usuarios</Typography.Title>
        </Col>
        <Col span={12}>
          <Table />
        </Col>
        <Col span={12} style={{paddingLeft:'40px'}}>
          <Form layout='vertical'>
            <Form.Item label='Titulo'>

              <Input />
            </Form.Item>
            <Form.Item label='Presupuesto'>
              <Input />
            </Form.Item>
<Form.Item label='Descripcion'>
              <Input.TextArea />
            </Form.Item>
<Form.Item label='Fecha inicio'>
              <Input />
            </Form.Item>


<Form.Item label='Fecha termino'>
              <Input />
            </Form.Item>

          </Form> 
    <Form.Item>
      <Button type='primary'>CREAR</Button>
      <Button danger type='primary' style={{marginLeft:'10px'}}>LIMPIAR</Button>
    </Form.Item>
        </Col>
      </Row>
    </div>
  )
}


export default Users 
