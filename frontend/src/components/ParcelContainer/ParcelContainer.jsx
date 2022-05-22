import React from 'react';
import './ParcelContainer.css';
import { Link } from 'react-router-dom';

const ParcelContainer = ({size, info}) => {

  return (
    <div className='parcel-container'>
      <h3 style={{color:'var(--primary-color', textTransform: 'uppercase'}}>{info.name}</h3>
      <Link to={`/courier-send/${size}/${info._id}/${info.name}`} className='primary-btn parcel-btn'>Select</Link>
    </div>
  )
}

export default ParcelContainer