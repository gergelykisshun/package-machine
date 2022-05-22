import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import ErrorPage from './components/ErrorPage/ErrorPage';
import CourierLogin from './components/CourierLogin/CourierLogin';
import CourierSend from './components/CourierSend/CourierSend';
import ClientPickUp from './components/ClientPickUp/ClientPickUp';


const App = () => {

  return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>} exact/>
            <Route path='/courier-login' element={<CourierLogin/>}/>
            <Route path='/courier-send/:size/:parcelID/:name' element={<CourierSend/>}/>
            <Route path='/client-pickup' element={<ClientPickUp/>}/>
            <Route path='*' element={<ErrorPage/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
  )
}

export default App
