import React, { useState, useEffect } from 'react'
import './CourierLogin.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ParcelContainer from '../ParcelContainer/ParcelContainer';
import { logInCourier, logOutCourier } from '../../store/courier';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

const CourierLogin = () => {

  const dispatch = useDispatch();
  const machineData = useSelector(state => state.machine.data.data);
  // console.log(machineData);
  const courierLoggedIn = useSelector(state => state.courier.isLoggedIn);
  // console.log(courierLoggedIn)
  const courierName = useSelector(state => state.courier.name);
  console.log(courierName)


  const [input, setInput] = useState({
    name: '',
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

  const initLogin = () => {
    fetch('/api/v1/login/login', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(input)
    }).then(res => res.json())
    .then(response => {
      if(response.success){
        dispatch(logInCourier(response));
      }
    }).catch(err => console.log(err))


  };
  
  const initLogOut = () => {
    fetch('/api/v1/login/logout')
    .then(res => res.json())
    .then(response => {
      if(response.success){
        dispatch(logOutCourier()); 
        setInput({name: '', password: ''})   
      }
    }).catch(err => console.log(err))
  };

  const autoFillInput = () => {
    setInput({
      name: 'John',
      password: 'John'
    })
  };

  return (
    <>
      {
        courierLoggedIn ?
        <section className='size-screen'>
          <div className="size-container">
            <h2 className='size-title'>A</h2>
            {machineData.aParcels.map(parcel => parcel.empty && <ParcelContainer size="a" key={parcel._id} info={parcel}/>)}
          </div>
          <div className="size-container">
            <h2 className='size-title'>B</h2>
            {machineData.bParcels.map(parcel => parcel.empty && <ParcelContainer size="b" key={parcel._id} info={parcel}/>)}
          </div>
          <div className="size-container">
            <h2 className='size-title'>C</h2>
            {machineData.cParcels.map(parcel => parcel.empty && <ParcelContainer size="c" key={parcel._id} info={parcel}/>)}
          </div>
          <button onClick={initLogOut} className='secondary-btn back-btn' style={{color: 'var(--primary-color)'}}>Back</button>
        </section>  
        :
        <section className='courier-login'>
          <Tooltip className='tool-tip-style' title="Easy-login autofill" arrow>
            <InfoIcon onClick={autoFillInput}/>
          </Tooltip>
          <input className='input-style' type="text" name='name' placeholder='name' onChange={inputHandler} value={input.name}/>
          <input className='input-style' type="password" name="password" placeholder='password' onChange={inputHandler} value={input.password}/>
          <button onClick={initLogin} className='primary-btn courier-login-btn'>Login</button>
          <Link to="/" className='secondary-btn confirm-send'>Back</Link>
        </section>
      }
    </>
  )
}

export default CourierLogin