import React, { useState } from 'react'
import { Upload, Row, Col, Form, notification, Input, Button, DatePicker } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import endpoints from '../api/endpoints'
import moment from 'moment'


const CreateJobApplication = () => {

  const [form] = Form.useForm() 
  const user = JSON.parse(localStorage.getItem('user') || null)
  const [img, setImg] = useState(null)


  const onSend = async(values) => {
    values = {
      ...values,
      owner_client: user.id,
      branch_office: user.branch_office_default.id,
      payment: img,
      start_date: moment(values.start_date).format('YYYY-MM-DD'),
      end_data: moment(values.end_data).format('YYYY-MM-DD')
    }
    const rq = await endpoints.job_applicationscl.create(values).then((r)=> {
      notification.success({message:'SOLICITUD ENVIADA CORRECTAMENTE'})
      form.resetFields()
    }) 
  }


  return(<Row justify={'center'} >
      <Col span={12}>
      <Form layout='vertical' form={form} onFinish={onSend} >
        <Form.Item label='Titulo' name='title' rules={[{ required: true , message:'Campo obligatorio'}, { min: 10, message:'Asegúrese de que este campo tenga al menos 10 caracteres.' }]} >
          <Input />
        </Form.Item>
        <Form.Item label='Descripcion' name='description' rules={[{ required: true , message:'Campo obligatorio'}, { min: 20, message:'Asegúrese de que este campo tenga al menos 20 caracteres.' }]} >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label='Fecha inicio' name='start_date' rules={[{ required: true , message:'Campo obligatorio'}]} >
          <DatePicker format={"YYYY-MM-DD"} placeholder='Selecciona una fecha de inicio' style={{width:'100%'}} />
        </Form.Item>
        <Form.Item label='Fecha termino' name='end_data' rules={[{ required: true , message:'Campo obligatorio'}]}  >
          <DatePicker format={"YYYY-MM-DD"} placeholder='Selecciona una fecha de termino' style={{width:'100%'}} />
        </Form.Item>
        <Form.Item label='Presupuesto ($)' name='budget' rules={[{ required: true , message:'Campo obligatorio'}]} >
          <Input placeholder='$ 000.000.000' type='number' />
        </Form.Item>
        <Form.Item label='Comprobante de pago' name='payment' rules={[{ required: true , message:'Campo obligatorio'}]} >
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
