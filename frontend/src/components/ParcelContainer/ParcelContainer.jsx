import React from 'react';
import './ParcelContainer.css';
import { Link } from 'react-router-dom';

const ParcelContainer = ({size, info}) => {

  return (
    <div className='parcel-container'>
      <p>Parcel ID: {info._id}</p>
      <Link to={`/courier-send/${size}/${info._id}/${info.name}`} className='primary-btn courier-login-btn'>Select</Link>
    </div>
  )
}

export default ParcelContainer