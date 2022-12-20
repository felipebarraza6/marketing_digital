import React, { useContext } from 'react'
import { Row, Form, Col, 
        Input, Card, Button,
        notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import endpoints from '../api/endpoints'
import { AppContext } from '../App'

const Login = () => {
  
  const [form] = Form.useForm()
  const { dispatch } = useContext(AppContext)


  const authProcess = async(values) => {
    try {
            const request = await endpoints.authenticated(values)      
            dispatch({
              type: 'LOGIN',
              payload: request
            })
            
            return request
          } catch(error) {
            notification.error({message: 'contraseña incorrecta'})
      }
  }

  return(<Row justify='center' >
    <Col col={12}>
      <Card title='Autenticación' hoverable style={{ width: '400px', marginTop: '50%', borderRadius:'20px' ,
          border: '2px solid #1677ff'}} >
        <Form form={form} onFinish={authProcess}>
          <Form.Item name='email'>
            <Input placeholder='Usuario' prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name='password'>
            <Input placeholder='Contraseña' type='password' prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <center>
              <Button htmlType='submit' type='primary'>Ingresar</Button>
              <Button onClick={()=> form.resetFields()} danger type='primary' style={{marginLeft:'10px'}}>Limpiar</Button>
            </center>
          </Form.Item>
        </Form> 
      </Card>
    </Col>

    </Row>)
}


export default Login
