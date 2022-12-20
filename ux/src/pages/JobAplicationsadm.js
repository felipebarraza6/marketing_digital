import React, { useEffect, useState } from 'react'
import {  Row, Col, Tag, Upload,  
           Button, Table, notification } from 'antd'
import endpoints from '../api/endpoints'
import { PlusOutlined } from '@ant-design/icons'

const JobAplicationsadm = () => {


  const user = JSON.parse(localStorage.getItem('user') || null)
  const [data, setData] = useState(null)
  const [img, setImg] = useState(null)
  const [update, setUpdate] = useState(0)
  const onSend = (values) => {
    values = {
      ...values,
      owner_adm: 1,
      owner_client: 1
    }
    console.log(values)
  }

  
  const getJobs = async()=> {
    const rq = await endpoints.job_applicationsadm.list()
    setData(rq.data.results)
  }

  const updateActionJob = async(field, value, uuid) => {
    const rq = await endpoints.job_applicationsadm.update(field, value, uuid)
  } 

  useEffect(()=> {
    getJobs()
  }, [update])

  return(
    <div>
      <Row>
        <Col span={24}>
          <Table dataSource={data} size='large' columns={[
            { dataIndex:'title', title:'Titulo' },
            { dataIndex:'description', title:'Descripcion' },
            {  render:(x)=><>{x.start_date}<br/>{x.end_data}</>, title:'Fecha', width:'10%' },
            { dataIndex:'budget', title:'$' },
            { dataIndex:'image_grafic', title:'Gráfica', render:(x)=><>{x ? <Button type="primary"  onClick={()=>window.open(x)}>Ver</Button>:'SIN IMÁGEN'}</> },
            { dataIndex:'payment', title:'Comprobante', render:(x)=><Button onClick={()=>window.open(x)}>Descargar</Button>},
            { dataIndex:'owner_client', title:'Cliente', render: (x)=> x.name_enterprise },
            { dataIndex:'owner_adm', title:'Admin', render: (x)=> <>{x && <>{x.first_name} {x.last_name}</> }</>  },
            { title:'Estado', render: (x)=> <>
                {x.is_confirmgrafic ? <>
                   GRÁFICA CONFIRMADA
                  </>:
                  <>
                    {x.is_answer_grafic ? <>
                      {x.is_answer_grafic && <>GRÁFICA RECHAZADA<br/><hr/>NOTA: {x.note_client}</>}
                    </>:<>
                      {x.is_active && x.is_answer && <>ESPERANDO CONFIRMACIÓN...</>}
                      </>}
                                      </> }
              </>  
            },
            { render: (x)=> <>
              {!x.is_active && !x.is_answer && <>
                <Button size='small' type='primary' style={{margin:'5px'}} onClick={async ()=> {
                  const rq1 = await updateActionJob('is_active', true, x.uuid)
                  const rq2 = await updateActionJob('is_answer', true, x.uuid)
                  const rq3 = await updateActionJob('owner_adm',user.id , x.uuid)
                  const rq4 = await setUpdate(update+1)
                  }}>Aceptar</Button>
                <Button size='small' type='primary' danger style={{margin:'5px'}} onClick={async()=> {
                  const rq1 = await updateActionJob('is_active', false, x.uuid)
                  const rq2 = await updateActionJob('is_answer', true, x.uuid)
                  const rq3 = await setUpdate(update+1)
                  }}>Cancelar</Button>
              </>}
              {x.is_active && x.is_answer && <>
                <Tag color='blue'>Aceptada por administrador</Tag>
                <Button size='small' type='primary' danger style={{marginTop:'5px', marginBottom:'5px'}} onClick={async()=> {
                  const rq1 = await updateActionJob('is_active', false, x.uuid)
                  const rq2 = await updateActionJob('is_answer', false, x.uuid)
                  const rq3 = await updateActionJob('is_confirmgrafic', false, x.uuid)
                  const rq4 = await updateActionJob('is_answer_grafic', false, x.uuid)
                  const rq5 = await setUpdate(update+1)

                  }}>Limpiar solicitud</Button>
              </>}
               {!x.is_active && x.is_answer && <>
                <Tag color='volcano'>Rechazada</Tag>
                <Button size='small' type='primary' danger style={{marginTop:'5px', marginBottom:'5px'}} onClick={async()=> {
                  const rq1 = await updateActionJob('is_active', false, x.uuid)
                  const rq2 = await updateActionJob('is_answer', false, x.uuid)
                  const rq3 = await updateActionJob('is_confirmgrafic', false, x.uuid)
                  const rq4 = await updateActionJob('is_answer_grafic', false, x.uuid)
                  const rq5 = await setUpdate(update+1)
                  }}>Limpiar solicitud</Button>
              </>}
              {x.is_active && x.is_answer && 
                <Button size='small'type='primary' style={{marginTop:'5px', marginBottom:'5px'}}> 
                    <Upload name="r1"  showUploadList={false} maxCount={1} 
                            onChange={async(e)=> {
                              const rq1 = await updateActionJob('image_grafic', e.file.originFileObj, x.uuid)
                              const rq2 = await updateActionJob('is_confirmgrafic', false, x.uuid)
                              const rq3 = await updateActionJob('is_answer_grafic', false, x.uuid)
                              const rq4 = await setUpdate(update+1)

                            }} > <p style={{color:'white'}}> <PlusOutlined style={{color:'white'}} /> Subir gráfica</p>
                        </Upload> </Button>}

              </>}
            ]} />
        </Col>
              </Row>
    </div>
  )
}


export default JobAplicationsadm
