import React, { useState, useEffect } from 'react'
import { Typography, Row, Button,Col, Table, Modal, Statistic, Card, Tag } from 'antd'
import { LoadingOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { Area, Line } from '@ant-design/plots'
import endpoints from '../api/endpoints'

const CampaignsAdm = () => {
  

  const [data, setData] = useState(null)

  const getCampaigns = async()=> {
    const rq = await endpoints.advertising_campaignsadm.list().then((x)=>{
      setData(x.data.results)
    })
  }


  useEffect(()=>{
    getCampaigns()
  },[])
  

  const config = {
            data: [
                {timePeriod: '1 de nov', m3:0},
                {timePeriod: '4 de nov', m3:0},
                {timePeriod: '7 de nov', m3:0},
                {timePeriod: '10 de nov', m3:0},
                {timePeriod: '13 de nov', m3:8230},
                {timePeriod: '16 de nov', m3:6212},
                {timePeriod: '19 de nov', m3:0},
                {timePeriod: '22 de nov', m3:0},
                {timePeriod: '28 de nov', m3:0},
            ],
            xField: 'timePeriod',
            yField: 'm3',            
            
          }

  return(
    <div>
      <Row>
        <Col span={24}>
          <Typography.Title>Campañas</Typography.Title>
        </Col>
        <Col span={24}>
          <Table dataSource={data} columns={[
            { dataIndex: 'job_applitacion', title: 'Cliente', render:(x)=>x.owner_client.name_enterprise},
            { dataIndex:'is_active', title:'Estado', render: (x)=> <>
              {x ?<> 
              <LoadingOutlined style={{color:'blue', fontSize:'17px', marginRight:'10px'}}/> Campaña Activa</>:<>
                <Button type='primary'>Activar campaña</Button>
                </>}
              </> },
            { title:'Alerta', render: ()=> <Tag color='volcano'>Debes revisar está campaña...</Tag> },
            { render: (x)=>  <Button type='primary' onClick={()=> Modal.info({
              title: x.uuid,
              width: '900px',
              content: <Row>
                <Col span={8} style={{padding:'10px'}}>
                  <Card hoverable>
                    <Statistic
                      title="Alcance"
                      value={x.alcance}
                      precision={3}
                    />
                  </Card>
                </Col>
                <Col span={8} style={{padding:'10px'}} >
                  <Card hoverable>
                    <Statistic
                      title="Costo por resultado"
                      value={x.resultado}
                      precision={0}
                    />
                  </Card>

                </Col>
                <Col span={8} style={{padding:'10px'}} >
                  <Card hoverable>
                    <Statistic
                      title="Importe gastado"
                      value={x.importe}
                      precision={0}
                    />
                  </Card>

                </Col>
                <Col span={24}>
                  <Area {...config} />
                </Col>
              </Row>
            })}>VER CAMPAÑA </Button>},
            { render:()=><Button danger type='primary'>Elimnar campaña</Button> }

          ]} />
        </Col>
      </Row>
    </div>
  )
}


export default CampaignsAdm 
