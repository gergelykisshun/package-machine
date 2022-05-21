import React, { useState, useEffect } from 'react'
import './CourierLogin.css';
import { useSelector, useDispatch } from 'react-redux';
import ParcelContainer from '../ParcelContainer/ParcelContainer';
import { logInCourier, logOutCourier } from '../../store/courier';

const CourierLogin = () => {

  const dispatch = useDispatch();
  const machineData = useSelector(state => state.machine.data.data);
  console.log(machineData);
  const courierLoggedIn = useSelector(state => state.courier.isLoggedIn);
  console.log(courierLoggedIn)


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

  const toggleSizeScreen = () => {
    dispatch(logInCourier());
  };
  
  const toggleSizeScreenBack = () => {
    dispatch(logOutCourier());    
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
          <button onClick={toggleSizeScreenBack} className='secondary-btn courier-login-btn' style={{color: 'var(--primary-color)'}}>Back</button>
        </section>  
        :
        <section className='courier-login'>
          <input className='input-style' type="text" name='name' placeholder='name' onChange={inputHandler} value={input.name}/>
          <input className='input-style' type="password" name="password" placeholder='password' onChange={inputHandler} value={input.password}/>
          <button onClick={toggleSizeScreen} className='primary-btn courier-login-btn'>Login</button>
        </section>
      }
    </>
  )
}

export default CourierLogin