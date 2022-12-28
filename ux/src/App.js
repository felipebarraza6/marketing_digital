import React, { 
    createContext, 
    useReducer,
    useEffect } from 'react'


import './assets/css/App.css'
import { appReducer } from './reducers/app_reducer'
import Home from './pages/Home'
import Login from './pages/Login'
import es_ES from 'antd/locale/es_ES';

import { ConfigProvider } from 'antd'
export const AppContext = createContext()



function App() {
  
  const initialState = {
    isAuth: false,
    user: null,
    token: null
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  const updateApp = async() => {
    const token = JSON.parse(localStorage.getItem('token') || null)
    const user = JSON.parse(localStorage.getItem('user') || null)
    
     
    if(user && token ){
        dispatch({
          type: 'LOGIN',
          payload: {
            access_token: token,
            user: user,
          }
        })
    } 
  }

  useEffect(()=> {
    updateApp()
  }, [])

  return (
    <AppContext.Provider value={{state, dispatch}} >
      <ConfigProvider locale={es_ES} >
         {state.isAuth ? <Home />:<Login />}
      </ConfigProvider>
    </AppContext.Provider>
  )
}

export default App
