import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Component List
import FooterComponent from './wrap/FooterComponent'
import HeaderComponent from './wrap/HeaderComponent'
import HomeComponent from './wrap/HomeComponent'

export default function WrapComponent() {
  return (
    <div id="wrap">

      <BrowserRouter>
        <Routes>
          <Route path='' element={<HeaderComponent />}>
            <Route index element={<HomeComponent />} />
            <Route path='/home' element={<HomeComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <FooterComponent />

    </div>
  )
}
