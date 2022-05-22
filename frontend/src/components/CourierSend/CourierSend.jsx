import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CourierSend.css';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { dropOffPackage } from '../../store/machine';
import { logOutCourier } from '../../store/courier';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

const CourierSend = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { parcelID, size, name } = useParams();

  const machineData = useSelector(state => state.machine.data.data);
  const status = useSelector(state => state.machine.status);

  const [input, setInput] = useState({
    password: nanoid().slice(0, 6),
  })

  useEffect(() => {
    if(status === 'succeeded'){
      setTimeout(() => {
        dispatch(logOutCourier());
        navigate("/");
      }, 3000)
    }
  }, [dispatch, status, navigate])
  
  const initDropOffHandler = () => {
    const copyData = {...machineData};
    const newParcelArray = copyData[`${size}Parcels`].map(parcel => {
      if(parcel._id === parcelID){
        return {...parcel, empty: false, password: input.password}
      } else {
        return parcel
      }
    });
    // console.log(copyData);
    const toSend = {
      newParcelArray,
      parcelToUpdate: {
        parcelID,
        size
      }
    }

    dispatch(dropOffPackage(toSend))
  };



  const createNewCode = () => {
    setInput(prev => ({
      ...prev,
      password: nanoid().slice(0, 6)
    }))
  };


  let content;

  if(status === 'idle'){
    content = 
    <>
      <h3 className='confirm-send'>Parcel ID: {name}</h3>
      <h3 className='confirm-send'>Password: {input.password}</h3>
      <button className='secondary-btn confirm-send'onClick={createNewCode}>Generate new code</button>
      <button className='primary-btn'onClick={initDropOffHandler}>Drop-off package</button>
      <Link to="/courier-login" className='secondary-btn confirm-send'>Back</Link>
    </>
  } else if(status === 'loading'){
    content = 
    <div style={{width: '100%', height: '100vh', display: 'flex', alignItems:'center', justifyContent:'center'}}>
      <CircularProgress style={{width:70, height:70}} />
    </div>
  } else if(status === 'succeeded'){
    content = 
    <div style={{width: '100%', height: '100vh', display: 'flex', alignItems:'center', justifyContent:'center'}}>
      <h2>Drop-off is successful! The system is logging you out!</h2>
    </div>
  }


  return (
    <section className='courier-login'>
      {content}
    </section>
)
}

export default CourierSend