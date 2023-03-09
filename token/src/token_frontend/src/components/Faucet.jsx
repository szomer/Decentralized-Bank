import React, { useState } from 'react';
import {
  token_backend,
  canisterId,
  createActor,
} from '../../../declarations/token_backend';
import { AuthClient } from '@dfinity/auth-client';

function Faucet() {
  // States
  const [isDisabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState('Claim Now!');

  // Claim Now button click
  async function handleClick() {
    // disable button while handling request
    setDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    // backend call to claim free tokens
    const result = await token_backend.payOut();
    // update the button
    setButtonText(result);
  }

  return (
    <div className='blue window'>
      <p id='claim-tokens-text'>
        Get your free PoTato tokens here! Claim 10,000 TATO tokens to your
        account.
      </p>
      <p className='trade-buttons'>
        <button id='btn-payout' onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
