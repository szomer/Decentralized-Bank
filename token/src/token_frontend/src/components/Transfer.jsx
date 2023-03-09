import React, { useState } from 'react';
import { token_backend } from '../../../declarations/token_backend';
import { Principal } from '@dfinity/principal';

function Transfer() {
  // States
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isDisabled, setDisabled] = useState(false);
  const [feedback, setFeedback] = useState('');

  // on Transfer button click
  async function handleClick() {
    // validation
    if (!recipient || !amount) return;
    // Disable button
    setDisabled(true);
    // Convert string values
    const recipientId = Principal.fromText(recipient);
    const amountToTransfer = Number(amount);
    // Get the result from backend
    const result = await token_backend.transfer(recipientId, amountToTransfer);
    setFeedback(result);
    // Enable button
    setDisabled(false);
  }

  return (
    <div className='window white'>
      <div className='transfer'>
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type='text'
                id='transfer-to-id'
                value={recipient}
                onChange={(e) => {
                  setRecipient(e.target.value);
                }}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type='number'
                id='amount'
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </li>
          </ul>
        </fieldset>
        <p className='trade-buttons'>
          <button id='btn-transfer' onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>

        {feedback && <p>{feedback}</p>}
      </div>
    </div>
  );
}

export default Transfer;
