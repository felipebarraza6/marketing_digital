import React, { useState, useEffect } from 'react'
import { Typography, Row, Button,Col, Table, Modal, Statistic, Card, Tag, Input } from 'antd'
import { LoadingOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { Area, Line } from '@ant-design/plots'
import endpoints from '../api/endpoints'

const CampaignsCl = () => {
  

  const [data, setData] = useState(null)
  const [update, setUpdate] = useState(0)

  const getCampaigns = async()=> {
    const rq = await endpoints.advertising_campaignscl.list().then((x)=>{
      setData(x.data.results)
    })
  }


  useEffect(()=>{
    getCampaigns()
  },[update])
  

  
  return(
    <div>
      <Row>
        <Col span={24}>
          <Table dataSource={data} columns={[
            { dataIndex: 'job_applitacion', title: 'Nombre campaña', render:(x)=>x.title},
            { dataIndex:'is_active', title:'Estado', render: (x)=> <>
              {x ?<> 
              <LoadingOutlined style={{color:'blue', fontSize:'17px', marginRight:'10px'}}/> Campaña Activa</>:<>
                <Tag color='volcano'>Campaña inactiva</Tag>
                </>}
              </> },
            { title:'Alerta', render: (x)=> <>{x.is_active ? <Tag color='volcano'>
              {x.result > 300 ? 'Debes revisar está campaña...':<></>}</Tag>

              :<Tag color="volcano"></Tag>
              }</>},
             { 
               title:'Funciones', 
               render: (x)=> <>{x.is_active && <Button danger type='primary' onClick={async()=>{
                  const rq = await endpoints.advertising_campaignsadm.update('is_active', false, x.uuid).then((x)=>{
                    setUpdate(update+1)
                  })
                
                }}  >PAUSAR CAMPAÑA</Button>}</>

             },
           , 
            { render: (x)=>  <Button type='primary' onClick={()=> Modal.info({
              style:{top:'0px'},
              title: x.uuid,
              width: '100%',
              content: <Row>
                <Col span={8} style={{padding:'10px'}}>
                  <Card hoverable style={{border:'3px solid #007ef1'}}>
                    <Statistic
                      title="Alcance"
                      value={x.scope}
                    />
                  </Card>
                </Col>
                <Col span={8} style={{padding:'10px'}} >
                  <Card hoverable style={{border:'3px solid #01ebe3'}} >
                    <Statistic
                      title="Costo por resultado"
                      value={`$ ${x.result}`}
                      precision={0}
                    />
                  </Card>

                </Col>
                <Col span={8} style={{padding:'10px'}} >
                  <Card hoverable style={{border:'3px solid #890ff5'}} >
                    <Statistic
                      title="Importe gastado"
                      value={`$ ${x.amount}`}
                      precision={0}
                    />
                  </Card>

                </Col>
                <Col span={18}>
                  <Card hoverable  style={{border:'3px solid #02042c'}} >
                    <img src={x.img_chart} width={'100%'} />
                  </Card>
                </Col>
                <Col span={6} style={{padding:'20px'}}>
                  <Typography.Paragraph>NOTA ADMINISTRADOR: <br/><b>{x.message_admin}</b></Typography.Paragraph>
                  <Typography.Paragraph>TU ÚLTIMO COMENTARIO: <br/><b>{x.message_client}</b></Typography.Paragraph>
                  <Input.TextArea placeholder='Envía un comentario...' rows={5} onChange={async(e)=>{
                  const rq = await endpoints.advertising_campaignsadm.update('message_client', e.target.value, x.uuid).then((x)=>{
                    setUpdate(update+1)
                  })
                
                }} />
                </Col>
              </Row>
            })}>VER CAMPAÑA </Button>},
,

          ]} />
        </Col>
      </Row>
    </div>
  )
}


export default CampaignsCl
