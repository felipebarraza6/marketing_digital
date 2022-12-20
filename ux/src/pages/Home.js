import React, {useContext} from 'react'
import { Layout, Menu, Button, 
          Typography } from 'antd'
import { AppContext } from '../App'
import { UnorderedListOutlined, NotificationOutlined, 
          UserOutlined, LogoutOutlined, UsergroupAddOutlined,
          PlusSquareFilled } from '@ant-design/icons'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import HomeNav from './HomeNav'
import JobAplicationsadm from './JobAplicationsadm'
import CampaignsAdm from './CampaignsAdm'
import Clients from './Clients'
import Users from './Users'
import CreateJobApplication from './CreateJobApplication'
import JobAplicationscl from './JobApplicationscl'
import CampaignsCl from './CampaignsCl'

const { Header, Sider, Content } = Layout


const Home = () => {
  
  const user = JSON.parse(localStorage.getItem('user'))
  const { state, dispatch } = useContext(AppContext)

  return(<Layout>
      <BrowserRouter>
      <Header>
        <Menu theme='dark' mode={'horizontal'} style={{flex: 'auto',
            marginLeft: '75%',
            order: 2
        }}>

          <Menu.Item>
            <Button>@{user.username}</Button>
          </Menu.Item>
          <Menu.Item>
            <Button icon={<LogoutOutlined/>} onClick={() => dispatch({type:'LOGOUT'})}>SALIR</Button>
          </Menu.Item>
        </Menu>
          </Header>
        <Layout>
        <Sider width={220} style={{padding:'20px', paddingBottom: '30%', paddingTop:'0px'}}>
          <Typography.Title level={2} style={{textAlign: 'center', color:'white'}}>Marketing App</Typography.Title>
          <Menu style={{borderRadius:'10px', marginTop:'100px'}}>
            {state.user.type_user === 'ADM' && <>
              {state.user.type_user=='ADM'&&<Menu.Item icon={<UnorderedListOutlined />}>
                <Link to='/solicitudes-adm'>Solicitudes</Link>
              </Menu.Item>}
              {state.user.type_user=='ADM'&&<Menu.Item icon={<NotificationOutlined/>}>
                  <Link to='/campanias'>Campañas</Link>
              </Menu.Item>}
              {state.user.type_user=='ADM'&&<Menu.Item icon={<UsergroupAddOutlined/>}>
                  <Link to='/clientes'>Clientes</Link>
              </Menu.Item>}
              {state.user.type_user=='ADM'&&<Menu.Item icon={<UserOutlined />}>
                  <Link to='/usuarios'>Administradores</Link>
              </Menu.Item>}
            </>}
          {state.user.type_user === 'CL' && <>
              {state.user.type_user=='CL'&&<Menu.Item icon={<PlusSquareFilled />}>
                <Link to='/crear-solicitud'>Crear solicitud</Link>
              </Menu.Item>}
              {state.user.type_user=='CL'&&<Menu.Item icon={<UnorderedListOutlined />}>
                <Link to='/solicitudes-cl'>Mis Solicitudes</Link>
              </Menu.Item>}
              {state.user.type_user=='CL'&&<Menu.Item icon={<NotificationOutlined/>}>
                  <Link to='/mis-campanias'>Mis Campañas</Link>
              </Menu.Item>}
          </>}
          </Menu>
        </Sider>
        <Layout>
                    <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          ><div style={{ padding: '20px', minHeight: '1360' }} >
            <Routes>
              <Route exact path='/' element={<HomeNav />} />
              <Route exact path='/solicitudes-adm' element={<JobAplicationsadm />} />
              <Route exact path='/crear-solicitud' element={<CreateJobApplication />} />
              <Route exact path='/solicitudes-cl' element={<JobAplicationscl />} />
              <Route exact path='/campanias' element={<CampaignsAdm />} />
              <Route exact path='/mis-campanias' element={<CampaignsCl />} />
              <Route exact path='/clientes' element={<Clients />} />
              <Route exact path='/usuarios' element={<Users />} />
            </Routes>
    </div>
          </Content>
        </Layout>

      </Layout>
      </BrowserRouter>
    </Layout>)
}



export default Home
