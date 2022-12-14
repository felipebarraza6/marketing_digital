import React, {useContext} from 'react'
import { Layout, Menu, Button, 
          Typography, Breadcrumb } from 'antd'
import { AppContext } from '../App'
import { UnorderedListOutlined, NotificationOutlined, 
          UserOutlined, LogoutOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import HomeNav from './HomeNav'
import JobAplications from './JobAplications'
import Campaigns from './Campaigns'
import Clients from './Clients'
import Users from './Users'

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
        <Sider width={200} style={{padding:'20px', paddingBottom: '30%'}}>
          <Typography.Title level={2} style={{textAlign: 'center', color:'white'}}>Marketing App</Typography.Title>
          <Menu style={{borderRadius:'10px'}}>
            {state.user.type_user === 'ADM' && <>
              {state.user.type_user=='ADM'&&<Menu.Item icon={<UnorderedListOutlined />}>
                <Link to='/solicitudes'>Solicitudes</Link>
              </Menu.Item>}
              {state.user.type_user=='ADM'&&<Menu.Item icon={<NotificationOutlined/>}>
                  <Link to='/campanias'>Campañas</Link>
              </Menu.Item>}
              {state.user.type_user=='ADM'&&<Menu.Item icon={<UsergroupAddOutlined/>}>
                  <Link to='/clientes'>Clientes</Link>
              </Menu.Item>}
              {state.user.type_user=='ADM'&&<Menu.Item icon={<UserOutlined />}>
                  <Link to='/usuarios'>Usuarios</Link>
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
              <Route exact path='/solicitudes' element={<JobAplications />} />
              <Route exact path='/campanias' element={<Campaigns />} />
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
