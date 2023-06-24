import React from 'react';
import { Outlet } from 'react-router-dom';
import SigninComponent from './home/SigninComponent';

export default function HeaderComponent() {
  
  const [state, setState] = React.useState({
    isSignIn: false
  });

  const onClickSignIn = (e) => {
    e.preventDefault();
    setState({
      ...state,
      isSignIn: true
    });
  };


  return (
    <>
      <header id="header">
        <div className="container">
          <div className="gap">
            <button type='button' onClick={onClickSignIn}><i className="fa-solid fa-key"></i>LOGIN</button>
            {
              state.isSignIn ? <SigninComponent /> : null
            }
          </div>
        </div>
      </header>
    <Outlet />
    </>
  )
}
