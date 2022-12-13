import React, { 
    createContext, 
    useReducer,
    useEffect } from 'react'

import './assets/css/App.css'
import { appReducer } from './reducers/app_reducer'
import Home from './pages/Home'
import Login from './pages/Login'

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
            token: token,
            user: user,
          }
        })
    } 
  }

  useEffect(()=> {
    updateApp()
  }, [])

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {state.isAuth ? <Home />:<Login />}
    </AppContext.Provider>
  )
}

export default App
