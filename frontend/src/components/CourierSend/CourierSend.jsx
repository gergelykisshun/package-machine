import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CourierSend.css';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { dropOffPackage } from '../../store/machine';

const CourierSend = () => {
  const dispatch = useDispatch();
  const { parcelID, size } = useParams();


  const [input, setInput] = useState({
    password: nanoid().slice(0, 6),
    parcelID,
    size
  })

  const initDropOffHandler = () => {
    console.log('init drop-off here');
    dispatch(dropOffPackage(input))
  };

  const createNewCode = () => {
    setInput(prev => ({
      ...prev,
      password: nanoid().slice(0, 6)
    }))
  };


  return (
    <section className='courier-login'>
      <h3 style={{color: 'var(--primary-color)'}}>Parcel selected: {input.parcelID}</h3>
      <h3 style={{color: 'var(--primary-color)'}}>Password: {input.password}</h3>
      <button onClick={createNewCode} className='secondary-btn courier-login-btn'>Generate new code</button>
      <button onClick={initDropOffHandler} className='primary-btn courier-login-btn'>Drop-off package</button>
      <Link to="/courier-login" className='secondary-btn courier-login-btn'>Back</Link>
    </section>
)
}

export default CourierSend