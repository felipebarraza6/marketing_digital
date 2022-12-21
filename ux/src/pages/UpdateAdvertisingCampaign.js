import React, { useState, useEffect } from 'react'
import { Typography, Button, Modal, Row, Col, Card, Upload, Statistic, Input, Tooltip, Alert } from 'antd' 
import endpoints from '../api/endpoints'

const UpdateAdvertisingCampaign = ({ advertising_campaign }) => {
  
  const [visible, setVisible] = useState(false)
  const [img, setImg] = useState(null)
  const [update, setUpdate] = useState(0)
  console.log(advertising_campaign)

  const [data, setData]=useState({
    scope: advertising_campaign.scope,
    amount: null,
    result: null,
    img_chart: null 
  })
  
  const getData = async() => {

    const rq = endpoints.advertising_campaignsadm.retrieve(advertising_campaign.uuid).then((r)=> {
      setData({...r.data})
    })

  }

  const onChangeInput = async(field, value) => {
    const rq = endpoints.advertising_campaignsadm.update(field, value, advertising_campaign.uuid).then((x)=>{
      setUpdate(update+1)
    })

  }

  useEffect(()=>{
    getData()
  },[update])

  return(<>
      <Modal style={{top:'20px'}} footer={[<Button type="primary" onClick={()=> setVisible(false)}>Voler</Button>]}  width={'100%'} title={advertising_campaign.uuid} onCancel={()=>setVisible(false)} visible={visible} onOk={()=>console.log(data)}>
        <Row>
          <Col span={8}>
            <Card style={{margin:'5px', border:'1px solid black'}} hoverable>
              <Statistic style={{marginBottom:'10px'}} title="Alcance" value={data.scope} />
              <Typography.Title level={5}>Ingresa el alcance...</Typography.Title>
              <Input placeholder='Digita el alcance' onChange={(x)=> {onChangeInput('scope', x.target.value)}} />
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{margin:'5px', border:'1px solid black'}} hoverable>
              <Statistic style={{marginBottom:'10px'}} title="Costo por resultado" value={`$ ${data.result}`} />
              <Typography.Title level={5}>Ingresa el costo...</Typography.Title>
              <Input placeholder='Digita el costo $' onChange={(x)=> {onChangeInput('result', x.target.value)}} />
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{margin:'5px', border:'1px solid black'}} hoverable>
              <Statistic style={{marginBottom:'10px'}} title="Importe gastado" value={`$ ${data.amount}`} />
              <Typography.Title level={5}>Ingresa el importe...</Typography.Title>
              <Input placeholder='Digita el improte' onChange={(x)=> {onChangeInput('amount', x.target.value)}}  />
            </Card>
          </Col>
          <Col span={19}> 
    <Tooltip placement="bottom" title='Haz click en la imágen para actualizar el reporte...' color='black'>
            <Card style={{margin:'5px', border:'1px solid black'}} hoverable>
    <Upload name="r1"  showUploadList={false} maxCount={1} 
                            onChange={async(e)=> {
                              onChangeInput('img_chart', e.file.originFileObj)
                            }} > 

              <img src={data.img_chart} width={'100%'} />
                        </Upload>
            </Card>
    </Tooltip>
          </Col>
          <Col span={5}>
            <Card title='Reporte administrador' hoverable >
              <Typography.Paragraph>{data.message_admin}</Typography.Paragraph>
              <Input.TextArea rows={4} placeholder='Ingresa el nuevo reporte'  onChange={async(e)=> {
                              onChangeInput('message_admin', e.target.value)
                            }} ></Input.TextArea>
            </Card> 
            <Card title='Comentario cliente' hoverable >
              {data.message_client}
            </Card> 
          </Col>
        </Row>
      </Modal>
      <Button type='primary' onClick={()=>setVisible(true)}>Datos de campaña</Button>
    </>)

}


export default UpdateAdvertisingCampaign
