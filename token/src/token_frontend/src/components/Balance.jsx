import React, { useState } from 'react';
// Call backend
import { token_backend } from '../../../declarations/token_backend';
// Import from DFINITY
import { Principal } from '@dfinity/principal';

function Balance() {
  // States
  const [inputValue, setInputValue] = useState('');
  const [balance, setBalance] = useState('');
  const [symbol, setSymbol] = useState('');

  // Check Balance clicked
  async function handleClick() {
    // validation
    if (!inputValue) return;
    // Convert the user text input to principal format
    const principal = Principal.fromText(inputValue);
    // Get and set the balance / symbol
    setBalance((await token_backend.getBalanceOf(principal)).toLocaleString());
    setSymbol(await token_backend.getSymbol());
  }

  return (
    <div className='window white'>
      <label>Check account token balance:</label>
      <p>
        <input
          id='balance-principal-id'
          type='text'
          placeholder='Enter a Principal ID'
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </p>
      <p className='trade-buttons'>
        <button id='btn-request-balance' onClick={handleClick}>
          Check Balance
        </button>
      </p>

      {balance && (
        <p>
          This account has a balance of {balance} {symbol}.
        </p>
      )}
    </div>
  );
}

export default Balance;
