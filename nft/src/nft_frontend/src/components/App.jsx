import React from 'react';
import Header from './Header';
import Footer from './Footer';

function App(props) {
  // const nftId = 'renrk-eyaaa-aaaaa-aaada-cai';
  console.log('User Principal:', props.loggedIn.toText());
  return (
    <div className='app' style={{ height: '100vh' }}>
      <Header loggedIn={props.loggedIn} />

      <Footer />
    </div>
  );
}

export default App;
