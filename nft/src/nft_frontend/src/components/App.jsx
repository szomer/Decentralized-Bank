import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';

function App(props) {
  // const nftId = 'renrk-eyaaa-aaaaa-aaada-cai';

  return (
    <div className='app' style={{ height: '100vh' }}>
      <BrowserRouter>
        <Header loggedIn={props.loggedIn} />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
