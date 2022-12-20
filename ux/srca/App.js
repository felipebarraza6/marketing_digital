import React, { useEffect } from 'react'

import logo from './logo.svg';
import './App.css';


import axios from 'axios'


const BASE_URL = 'http://localhost:8000'


export const INSTANCE = axios.create({
    baseURL: BASE_URL,
})


const GET = async (endpoint) =>{

        const response = await INSTANCE.get(endpoint )

    return response
}

const get = async()=>{
  const rq = await GET('users/')
  console.log(rq)
}


function App() {
useEffect(()=>{
  get()

},[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
