import React, { useState } from 'react';
import App from './components/App';
import { Principal } from '@dfinity/principal';

function Auth() {
  const [login, setLogin] = useState(false);

  function onLogIn() {
    setLogin(true);
  }

  return (
    <>
      {login ? (
        <App loggedIn={Principal.fromText('2vxsx-fae')} />
      ) : (
        <div className='auth'>
          <h2 className='display-4'>Sign in as a Guest</h2>
          <a className='text-light' onClick={onLogIn}>
            Click Here
          </a>
        </div>
      )}
    </>
  );
}

export default Auth;
