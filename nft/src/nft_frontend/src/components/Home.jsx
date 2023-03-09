import React from 'react';
import image from '../../assets/placeholder.png';

function Home() {
  return (
    <div className='home'>
      <div className='content'>
        <h2 className='display-3'>Welcome</h2>
        <p className='lead mb-5'>Browse or share NFTs with ease !</p>
        <img src={image} alt='' />
      </div>
    </div>
  );
}

export default Home;
