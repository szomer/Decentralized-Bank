import React from 'react';
import ReactDOM from 'react-dom/client';
import Auth from './Auth';
import App from './components/App';
import { AuthClient } from '@dfinity/auth-client';

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
  console.log(userPrincipal);

  root.render(
    <React.StrictMode>
      <App loggedIn={userPrincipal} />
    </React.StrictMode>
  );
}

// init();
root.render(
  <React.StrictMode>
    <Auth />
  </React.StrictMode>
);
