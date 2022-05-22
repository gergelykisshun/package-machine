import React, { useState, useEffect } from 'react';
import './ClientPickUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dropOffPackage } from '../../store/machine';
import CircularProgress from '@mui/material/CircularProgress';


const ClientPickUp = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const machineData = useSelector(state => state.machine.data.data);
  console.log(machineData);
  const status = useSelector(state => state.machine.status);
  console.log(status);

  useEffect(() => {
    if(status === 'succeeded'){
      setTimeout(() => {
        navigate("/");
      }, 3000)
    }
  }, [dispatch, status, navigate])


  const [input, setInput] = useState({
    parcelName: '',
    password: ''
  })

  const inputHandler = (e) => {
    const {value, name} = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const initPickUpHandler = () => {
    const copyData = {...machineData};
    const newParcelArray = copyData[`${input.parcelName[0]}Parcels`];
    const parcelID = newParcelArray.find(parcel => parcel.name === input.parcelName)._id;
    // console.log(copyData);
    const toSend = {
      password: input.password,
      newParcelArray,
      parcelToUpdate: {
        parcelID,
        size: input.parcelName[0]
      }
    }
    dispatch(dropOffPackage(toSend))
  };


  let content;

  if(status === 'idle'){
    content = 
    <>
      <h3 style={{color: 'var(--primary-color)'}}>Please enter the following:</h3>
      <input className='input-style' type="text" name='parcelName' placeholder='parcel name' onChange={inputHandler} value={input.parcelName}/>
      <input className='input-style' type="password" name="password" placeholder='password' onChange={inputHandler} value={input.password}/>
      <button onClick={initPickUpHandler} className='primary-btn'>Pick-up Package</button>
      <Link to="/" className='secondary-btn confirm-send'>Back</Link>
    </>
  } else if(status === 'loading'){
    content = 
    <div style={{width: '100%', height: '100vh', display: 'flex', alignItems:'center', justifyContent:'center'}}>
      <CircularProgress style={{width:70, height:70}} />
    </div>
  } else if(status === 'succeeded'){
    content = 
    <>
      <h2 className='feedback-text'>Pick-up is successful! Please take your package!</h2>
    </>
    
  }


  return (
    <section className='courier-login'>
      {content}
    </section>
  )

}

export default ClientPickUp;