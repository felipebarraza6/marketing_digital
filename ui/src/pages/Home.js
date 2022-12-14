import React, {useContext} from 'react'
import { Layout, Menu, Button, 
          Typography, Breadcrumb } from 'antd'
import { AppContext } from '../App'
import { UnorderedListOutlined, NotificationOutlined, 
          UserOutlined, LogoutOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { BrowserRouter, Route, Routes } from "react-router-dom"

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
        <Sider width={200} style={{padding:'20px'}}>
          <Typography.Title level={2} style={{textAlign: 'center', color:'white'}}>Marketing App</Typography.Title>
          <Menu>
            {state.user.type_user === 'ADM' && <>
              {state.user.type_user=='ADM'&&<Menu.Item icon={<UnorderedListOutlined />}>Solicitudes</Menu.Item>}
              {state.user.type_user=='ADM'&&<Menu.Item icon={<NotificationOutlined/>}>Campañas</Menu.Item>}
              {state.user.type_user=='ADM'&&<Menu.Item icon={<UsergroupAddOutlined/>}>Clientes</Menu.Item>}
              {state.user.type_user=='ADM'&&<Menu.Item icon={<UserOutlined />}>Usuarios</Menu.Item>}
            </>}
  
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route exact path='/' element={<></>} />
              <Route exact path='/solicitudes' element={<></>} />
              <Route exact path='/companias' element={<></>} />
              <Route exact path='/usuarios' element={<></>} />
            </Routes>
          </Content>
        </Layout>

      </Layout>
      </BrowserRouter>
    </Layout>)
}



export default Home
