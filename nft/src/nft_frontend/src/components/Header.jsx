import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Minter from './Minter';
import Gallery from './Gallery';
import Home from './Home';
import CURRENT_USER_ID from '../index';
import { nft_backend } from '../../../declarations/nft_backend';

function Header() {
  const [userGallery, setUserGallery] = useState('');

  async function getNFTs() {
    const userNTFsIds = await nft_backend.getOwnerNfts(CURRENT_USER_ID);
    setUserGallery(<Gallery ids={userNTFsIds} />);
  }

  useEffect(() => {
    getNFTs();
  }, []);

  return (
    <BrowserRouter forceRefresh={true}>
      <div id='header'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/discover'>Discover</Link>
          </li>
          <li>
            <Link to='/minter'>Minter</Link>
          </li>
          <li>
            <Link to='/collection'>Collection</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route path='/discover' element={<h1>Discover</h1>}></Route>
        <Route path='/minter' element={<Minter />}></Route>
        <Route path='/collection' element={userGallery}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Header;
