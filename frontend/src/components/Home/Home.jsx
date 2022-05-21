import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { fetchImagesForArt, changeResultsPerPage, decreasePageNumber, incrementPageNumber, startSearch } from '../../store/allArt';
import './Home.css';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';




const Home = () => {

  // //REDUX STATES
  // const dispatch = useDispatch()
  // const allArt = useSelector(state => state.allArt.artworks.data);

  // // LOADING SPINNER IMPLEMENTATION
  // let content;

  // if(artStatus === 'loading'){
  //   content = 
  //   <div style={{width: '100%', height: '100vh', display: 'flex', alignItems:'center', justifyContent:'center'}}>
  //     <CircularProgress style={{width:70, height:70}} />
  //   </div>
  // } else if (artStatus === 'succeeded'){
  //   content = 
  //   <div className='art-container'>
  //     {allArt.map((art,i) => artImages[i] && <Artwork key={art.id} image={artImages[i]} info={art}/>)}
  //   </div>
  // } else if (artStatus === 'failed'){
  //   content = <ErrorPage />

  return (
    <section className='home-container'>
      <Link className='primary-btn home-btn' to='/client-pickup' >Pick-up</Link>
      <Link className='primary-btn home-btn' to='/courier-login' >Drop-off</Link>
    </section>
  )
}

export default Home;