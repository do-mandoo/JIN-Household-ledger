import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Profile from './Profile';

const SApp = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to='/'>홈</Link>
            </li>
            <li>
              <Link to='/about'>소개</Link>
            </li>
            <li>
              <Link to='/profile/won'>won 프로필</Link>
            </li>
            <li>
              <Link to='/profile/gildong'>gildong 프로필</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile/:username' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default SApp;
