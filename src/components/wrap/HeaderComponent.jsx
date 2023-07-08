import React from 'react';
import { Outlet } from 'react-router-dom';

export default function HeaderComponent() {

  return (
    <>
      <header id="header">
        <div className="container">
          <div className="gap">
            <button type='button'><i className="fa-solid fa-key"></i>LOGIN</button>
          </div>
        </div>
      </header>
    <Outlet />
    </>
  )
}
