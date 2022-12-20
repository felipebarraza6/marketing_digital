import React, { useEffect, useState } from 'react'
import {  Row, Col, Tag, Modal, Input,  
           Button, Table, notification } from 'antd'
import endpoints from '../api/endpoints'
import { PlusOutlined } from '@ant-design/icons'

const JobAplicationscl = () => {


  const user = JSON.parse(localStorage.getItem('user') || null)
  const [data, setData] = useState(null)
  const [update, setUpdate] = useState(0)
  const [note, setNote] = useState('')
  const onSend = (values) => {
    values = {
      ...values,
      owner_adm: 1,
      owner_client: 1
    }
    console.log(values)
  }

  
  const getJobs = async()=> {
    const rq = await endpoints.job_applicationscl.list()
    setData(rq.data.results)
  }

  const updateActionJob = async(field, value, uuid) => {
    const rq = await endpoints.job_applicationsadm.update(field, value, uuid)
  } 

  console.log(note)

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
            { dataIndex:'image_grafic', title:'Gráfica', render:(x)=><>{x ? <Button onClick={()=>window.open(x)}>Ver</Button>:'SIN IMÁGEN'}</> },
            { dataIndex:'payment', title:'Comprobante', render:(x)=><Button onClick={()=>window.open(x)}>Descargar</Button>},
            { dataIndex:'owner_adm', title:'Admin', render: (x)=> <>{x && <>{x.first_name} {x.last_name}</> }</>  },
            { title:'Estado', render: (x)=> 
              <>
              {!x.is_answer && !x.is_active && <Tag color='purple'>SIN RESPUESTA</Tag>}
              {x.is_answer && !x.is_active && <Tag color='volcano'>RECHAZADA</Tag>}
              {x.is_answer && x.is_active  && 
                <>
                  {x.is_answer_grafic && x.is_confirmgrafic && <Tag color='blue'>GRÁFICA APROBADA, SE CREARA LA CAMPAÑA</Tag>}
                  {x.is_answer_grafic && !x.is_confirmgrafic && <Tag color='volcano'>RECHAZADA</Tag>}
                  {!x.is_answer_grafic && !x.is_confirmgrafic && <>APROBADA, GRÁFICA POR CONFIRMAR...</>}
                </>              
              }
              </>  },
            { render: (x)=> <>
              {x.image_grafic && <>{!x.is_confirmgrafic && !x.is_answer_grafic  && <>
                <Button size='small' type='primary' style={{marginBottom:'5px'}} onClick={async ()=> {
                  const rq1 = await updateActionJob('is_confirmgrafic', true, x.uuid)
                  const rq2 = await updateActionJob('is_answer_grafic', true, x.uuid)
                  const rq3 = await setUpdate(update+1)
                  }} block>Aceptar Gráfica</Button>
                <Input.TextArea onChange={(x)=>setNote(x.target.value)} placeholder='Ingresa tus correcciones...' style={{ width: '110%',  }} rows={4} />
                <Button size='small' block type='primary' danger style={{marginTop:'5px'}} onClick={async()=> {
                  const rq1 = await updateActionJob('is_confirmgrafic', false, x.uuid)
                  const rq2 = await updateActionJob('is_answer_grafic', true, x.uuid)
                  const rq3 = await updateActionJob('note_client', note, x.uuid)
                  const rq4 = await setUpdate(update+1)
                  }}>Rechazar Gráfica</Button>
              </>}</>}

              </>}
            ]} />
        </Col>
              </Row>
    </div>
  )
}


export default JobAplicationscl
