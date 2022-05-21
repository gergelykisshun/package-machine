import React from 'react';
import './ParcelContainer.css';
import { Link } from 'react-router-dom';

const ParcelContainer = ({info}) => {

  return (
    <div className='parcel-container'>
      <p>Parcel ID: {info._id}</p>
      <Link to={`/courier-send/${info._id}`} className='primary-btn courier-login-btn'>Select</Link>
    </div>
  )
}

export default ParcelContainer