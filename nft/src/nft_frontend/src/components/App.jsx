import React from 'react';
import Minter from './Minter';
import Header from './Header';
import Footer from './Footer';

function App(props) {
  // const nftId = 'renrk-eyaaa-aaaaa-aaada-cai';

  return (
    <div className='app' style={{ height: '100vh' }}>
      <Header loggedIn={props.loggedIn} />

      <Footer />
    </div>
  );
}

export default App;
