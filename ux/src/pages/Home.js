import React, {useContext} from 'react'
import { Layout, Menu, Button, 
          Typography } from 'antd'
import { AppContext } from '../App'
import { UnorderedListOutlined, NotificationOutlined, 
          UserOutlined, LogoutOutlined, UsergroupAddOutlined,
          PlusSquareFilled, BuildOutlined } from '@ant-design/icons'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import HomeNav from './HomeNav'
import JobAplicationsadm from './JobAplicationsadm'
import CampaignsAdm from './CampaignsAdm'
import Clients from './Clients'
import logo from '../assets/images/logo.png'
import logo2 from '../assets/images/logo2.png'
import Users from './Users'
import CreateJobApplication from './CreateJobApplication'
import JobAplicationscl from './JobApplicationscl'
import CampaignsCl from './CampaignsCl'
import BranchOfficces from './BranchOfficces'

const { Header, Sider, Content } = Layout


const Home = () => {
  
  const user = JSON.parse(localStorage.getItem('user'))
  const { state, dispatch } = useContext(AppContext)

  return(<Layout>
      <BrowserRouter>
      <Header style={{backgroundColor:user.type_user == 'CL' && '#468FF2'}}>
        <Menu theme='dark' mode={'horizontal'} style={{flex: 'auto',
            marginLeft: '75%',
            order: 2,
            backgroundColor:user.type_user == 'CL' && '#468FF2'
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
        <Sider width={220} style={{padding:'20px', paddingBottom: '30%', paddingTop:'0px', backgroundColor:user.type_user == 'CL' && '#468FF2'}}>
    {state.user.type_user === 'ADM' ?<img src={logo} width={'100%'} />: <img src={logo2} width={'100%'} />}
          <Menu style={{borderRadius:'10px', marginTop:'50px'}}>
            {state.user.type_user === 'ADM' && <>
              {state.user.type_user=='ADM'&&<Menu.Item icon={<UnorderedListOutlined />}>
                <Link to='/'>Solicitudes</Link>
              </Menu.Item>}
              {state.user.type_user=='ADM'&&<Menu.Item icon={<NotificationOutlined/>}>
                  <Link to='/campanias'>Campañas</Link>
              </Menu.Item>}
              {state.user.type_user=='ADM'&&<Menu.Item icon={<BuildOutlined />}>
                  <Link to='/sucursales'>Sucursales</Link>
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
                <Link to='/'>Mis Solicitudes</Link>
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
              <Route exact path= {state.user.type_user == 'ADM' ? '/' : '/solicitudes-adm'} element={<JobAplicationsadm />} />
              <Route exact path='/crear-solicitud' element={<CreateJobApplication />} />
              <Route exact path={state.user.type_user == 'CL' ? '/' : '/solicitudes-cl'}  element={<JobAplicationscl />} />
              <Route exact path='/campanias' element={<CampaignsAdm />} />
              <Route exact path='/mis-campanias' element={<CampaignsCl />} />
              <Route exact path='/clientes' element={<Clients />} />
              <Route exact path='/usuarios' element={<Users />} />
              <Route exact path='/sucursales' element={<BranchOfficces />} />
            </Routes>
    </div>
          </Content>
        </Layout>

      </Layout>
      </BrowserRouter>
    </Layout>)
}



export default Home
