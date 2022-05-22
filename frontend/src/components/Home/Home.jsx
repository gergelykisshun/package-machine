import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMachine } from '../../store/machine';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMachine());
  }, [dispatch])


  return (
    <section className='home-container'>
      <Link className='primary-btn home-btn' to='/client-pickup' >Pick-up</Link>
      <Link className='primary-btn home-btn' to='/courier-login' >Drop-off</Link>
    </section>
  )
}

export default Home;