import React, { useState, useEffect } from 'react'
import { Typography, Row, Button,Col, Table, Modal, Statistic, Card,  } from 'antd'
import { LoadingOutlined, ArrowDownOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons'
import { Area, Line } from '@ant-design/plots'
import endpoints from '../api/endpoints'
import UpdateAdvertisingCampaign from './UpdateAdvertisingCampaign' 

const CampaignsAdm = () => {
  

  const [data, setData] = useState(null)
  const [update, setUpdate] = useState(0)

  const getCampaigns = async()=> {
    const rq = await endpoints.advertising_campaignsadm.list().then((x)=>{
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
            { dataIndex: 'job_applitacion', title: 'Cliente', render:(x)=>x.owner_client.name_enterprise},
            { dataIndex: 'scope', title: 'Alcance'},
            { dataIndex: 'result', title: 'Costo'},
            { dataIndex: 'amount', title: 'Importe'},
            { title:'Estado', render: (x)=> <>
              {x.is_active ?<> 
              <LikeFilled style={{color:'blue', fontSize:'17px', marginRight:'0px'}}/> <Button type='primary' onClick={async()=>{
                  const rq = await endpoints.advertising_campaignsadm.update('is_active', false, x.uuid).then((x)=>{
                    setUpdate(update+1)
                  })
                
                }} danger>Desactivar campaña</Button>
 </>:<>
              <DislikeFilled style={{color:'red', fontSize:'17px', marginRight:'10px'}}/>                 
<Button type='primary' onClick={async()=>{
                  const rq = await endpoints.advertising_campaignsadm.update('is_active', true, x.uuid).then((x)=>{
                    setUpdate(update+1)
                  })
                }}>Activar campaña</Button>

              </>
              }
              
              

              </> },
            { render:(x)=><UpdateAdvertisingCampaign advertising_campaign={x} /> },

          ]} />
        </Col>
      </Row>
    </div>
  )
}


export default CampaignsAdm 
