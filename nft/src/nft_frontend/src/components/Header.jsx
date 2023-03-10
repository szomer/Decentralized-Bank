import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Minter from './Minter';
import Gallery from './Gallery';
import Home from './Home';
import { nft_backend } from '../../../declarations/nft_backend';
import logo from '../../assets/logo.jpg';

function Header(props) {
  const [userGallery, setUserGallery] = useState('');

  async function getNFTs() {
    const userNTFsIds = await nft_backend.getOwnerNfts(props.loggedIn);
    setUserGallery(<Gallery ids={userNTFsIds} />);
  }

  useEffect(() => {
    getNFTs();
  }, []);

  return (
    <div>
      <header className='header'>
        <div className='navbar fixed-top navbar-dark navbar-expand-sm'>
          <div className='container'>
            <a className='navbar-brand' href='/'>
              <img id='logo' src={logo} alt='' />
            </a>

            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarNav'
              aria-controls='navbarNav'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>

            <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className='navbar-nav w-100 justify-content-end me-auto mb-2'>
                <li className='nav-item p-2'>
                  <Link to='/'>Home</Link>
                </li>
                <li className='nav-item p-2'>
                  <Link to='/discover'>Discover</Link>
                </li>
                <li className='nav-item p-2'>
                  <Link to='/minter'>Minter</Link>
                </li>
                <li className='nav-item p-2'>
                  <Link to='/collection'>Collection</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <Routes>
        <Route path='*' element={<Home />}></Route>
        <Route path='/discover' element={<h1>Discover</h1>}></Route>
        <Route path='/minter' element={<Minter />}></Route>
        <Route path='/collection' element={userGallery}></Route>
      </Routes>
    </div>
  );
}

export default Header;
