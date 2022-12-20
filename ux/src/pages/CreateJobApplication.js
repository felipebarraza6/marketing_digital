import React, { useState } from 'react'
import { Upload, Row, Col, Form, notification, Input, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import endpoints from '../api/endpoints'


const CreateJobApplication = () => {

  const [form] = Form.useForm() 
  const user = JSON.parse(localStorage.getItem('user') || null)
  const [img, setImg] = useState(null)


  const onSend = async(values) => {
    values = {
      ...values,
      owner_client: user.id,
      branch_office: user.branch_office_default.id,
      payment: img
    }

    const rq = await endpoints.job_applicationscl.create(values).then((r)=> {
      notification.success({message:'SOLICITUD ENVIADA CORRECTAMENTE'})
      form.resetFields()
    }) 
  }


  return(<Row justify={'center'} >
      <Col span={12}>
      <Form layout='vertical' form={form} onFinish={onSend} >
        <Form.Item label='Titulo' name='title'>
          <Input />
        </Form.Item>
        <Form.Item label='Descripcion' name='description'>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label='Fecha inicio' name='start_date'>
          <Input placeholder='AAAA-MM-DD' />
        </Form.Item>
        <Form.Item label='Fecha termino' name='end_data'>
          <Input placeholder='AAAA-MM-DD' />
        </Form.Item>
        <Form.Item label='Presupuesto ($)' name='budget'>
          <Input placeholder='$ 000.000.000' type='number' />
        </Form.Item>
        <Form.Item label='Comprobante de pago' name='payment'>
          <Button type='primary'>
          <Upload name="r1"  showUploadList={false} maxCount={1} 
                            onChange={async(e)=> {
                              setImg(e.file.originFileObj)

                            }} > <p style={{color:'white'}}> <PlusOutlined style={{color:'white'}} /> Agregar comprobante</p>
                        </Upload> </Button>

        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{marginRight:'20px'}}>Enviar</Button>
          <Button onClick={()=> form.resetFields()} >Limpiar</Button>
        </Form.Item>
      </Form>
      </Col>
    </Row>)

}


export default CreateJobApplication
