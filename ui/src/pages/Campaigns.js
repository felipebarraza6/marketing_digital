import React from 'react'
import { Typography, Row, Col, Table } from 'antd'

const Campaigns = () => {
  return(
    <div>
      <Row>
        <Col span={24}>
          <Typography.Title>Campañas</Typography.Title>
        </Col>
        <Col span={24}>
          <Table />
        </Col>
      </Row>
    </div>
  )
}


export default Campaigns 
