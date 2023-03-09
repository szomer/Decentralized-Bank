import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { AuthClient } from '@dfinity/auth-client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const init = async () => {
  // new authclient object
  const authClient = await AuthClient.create();

  if (await authClient.isAuthenticated()) {
    handleAuth(authClient);
  } else {
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
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

init();
