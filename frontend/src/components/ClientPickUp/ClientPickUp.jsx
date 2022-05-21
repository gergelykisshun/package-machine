import React, { useState, useEffect } from 'react';
import './ClientPickUp.css';

const ClientPickUp = () => {

  const [input, setInput] = useState({
    parcelID: '',
    password: ''
  })

  useEffect(() => {

  }, [])

  const inputHandler = (e) => {
    const {value, name} = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const initDropOffHandler = () => {
    console.log('init drop-off here')
    // needs full reload!!!
    window.location.href = '/'
  }




  return (
    <section className='courier-login'>
      <h3 style={{color: 'var(--primary-color)'}}>Please enter the following:</h3>
      <input className='input-style' type="text" name='parcelID' placeholder='parcel ID' onChange={inputHandler} value={input.parcelID}/>
      <input className='input-style' type="password" name="password" placeholder='password' onChange={inputHandler} value={input.password}/>
      <button onClick={initDropOffHandler} className='primary-btn courier-login-btn'>Pick-up Package</button>
    </section>
  )

}

export default ClientPickUp;