import React from 'react';
import image from '../../assets/placeholder.png';

function Home() {
  return (
    <div className='home'>
      <div className='content'>
        <h2>Welcome</h2>
        <img src={image} alt='' />
      </div>
    </div>
  );
}

export default Home;
