import React from 'react'
import { Typography, Row, Button,Col, Table, Modal, Statistic, Card, Tag } from 'antd'
import { LoadingOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { Area, Line } from '@ant-design/plots'

const Campaigns = () => {
  const data = [
    { uuid:'0a8e4c78e7143c2e08af154cd5fe4ba52f1f0a77', cliente: 'Luis', alcance: '18.909', importe: '$3.000', resultado:'153', frecuencia:'1,3' }
  ] 

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
            { dataIndex: 'cliente', title: 'Cliente' },
            { dataIndex: 'uuid', title: 'UUID' },
            { title:'Estado', render: ()=> <><LoadingOutlined style={{color:'blue', fontSize:'17px', marginRight:'10px'}}/> Campaña Activa</> },
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
            })}>VER CAMPAÑA </Button>}

          ]} />
        </Col>
      </Row>
    </div>
  )
}


export default Campaigns 
