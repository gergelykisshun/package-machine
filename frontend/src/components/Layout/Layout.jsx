import React from 'react';
import { useSelector } from 'react-redux';

import './Layout.css';
import ToastMessage from '../ToastMessage/ToastMessage';

export const toastMessageContext = React.createContext();


const Layout = ({children}) => {

  const toastVisibility = useSelector(state => state.toast.isVisible);

  return (
      <div className='wrapper'>
        <header className='header'>
            <h1 to='/' className='header-title'>
              Package machine
            </h1>
        </header>
        <>
          {children}
          {toastVisibility && <ToastMessage />}
        </>
      </div>
  )
}

export default Layout;