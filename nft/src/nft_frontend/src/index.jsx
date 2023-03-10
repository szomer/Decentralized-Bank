import React from 'react';
import ReactDOM from 'react-dom/client';
import Auth from './Auth';
import App from './components/App';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';
import { Ed25519KeyIdentity } from '@dfinity/identity';

const root = ReactDOM.createRoot(document.getElementById('root'));

const init = async () => {
  // new authclient object
  const authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    handleAuth(authClient);
  } else {
    root.render(
      <React.StrictMode>
        <Auth />
      </React.StrictMode>
    );

    // log in with identity, when successfull render page
    await authClient.login({
      identityProvider: 'https://identity.ic0.app/#authorize',
      onSuccess: () => {
        handleAuth(authClient);
      },
    });
  }
};

async function handleAuth(authClient) {
  const userPrincipal = await authClient
    .getIdentity()
    .getPrincipal()
    .toString();
  root.render(
    <React.StrictMode>
      <App loggedIn={userPrincipal} />
    </React.StrictMode>
  );
}
// Principal.fromText('2vxsx-fae')
// init();

// qfbba-s76b2-foauk-2lrty-doae4-pis42-3ffgu-pxvc7-auufz-gqhuu-lqe
testing();
async function testing() {
  // const identity = await Ed25519KeyIdentity.generate();
  // const randomPrincipal = identity.getPrincipal();

  root.render(
    <React.StrictMode>
      <App loggedIn={Principal.fromText('2vxsx-fae')} />
    </React.StrictMode>
  );
}
