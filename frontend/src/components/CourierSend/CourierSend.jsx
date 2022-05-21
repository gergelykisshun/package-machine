import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CourierSend.css';

const CourierSend = () => {
  const { parcelID } = useParams();

  const [input, setInput] = useState({
    name: '',
    password: '',
    parcelID
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

  };
  return (
    <section className='courier-login'>
      <h3 style={{color: 'var(--primary-color)'}}>Parcel selected: {input.parcelID}</h3>
      <input className='input-style' type="text" name='name' placeholder='name' onChange={inputHandler} value={input.name}/>
      <input className='input-style' type="password" name="password" placeholder='password' onChange={inputHandler} value={input.password}/>
      <button onClick={initDropOffHandler} className='primary-btn courier-login-btn'>Drop-off package</button>
    </section>
)
}

export default CourierSend