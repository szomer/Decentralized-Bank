import React, { useEffect, useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/nft';
import Button from './Button';
import { nft_backend } from '../../../declarations/nft_backend';

function Item(props) {
  // REACT State
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [button, setButton] = useState();
  const [priceInput, setPriceInput] = useState();
  const [msg, setMsg] = useState();
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [sellStatus, setSellStatus] = useState();

  var price;

  // ID of NTF
  const id = props.id;

  const localHost = 'http://localhost:8080/';
  const agent = new HttpAgent({ host: localHost });
  // while working locally:
  agent.fetchRootKey();
  let NFTActor;

  // Request the NFT details
  async function loadNFT() {
    NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });

    // Retrieve the name, owner and image
    const itemName = await NFTActor.getName();
    const itemOwner = await NFTActor.getOwner();
    const itemContent = await NFTActor.getContent();
    // Convert the image
    const imageContentConverted = new Uint8Array(itemContent);
    const imageContent = URL.createObjectURL(
      new Blob([imageContentConverted.buffer], { type: 'image/png' })
    );
    // Set the NFT data to States
    setName(itemName);
    setOwner(itemOwner.toText()); // Convert Principal to Text format
    setImage(imageContent);
    const nftIsListed = await nft_backend.isListed(id);
    if (nftIsListed) {
      setOwner('NFT Market Place');
      setBlur({ filter: 'grayscale(100%)' });
      setSellStatus(<h3 className='card-subtitle mb-2 lead'>Listed</h3>);
    } else {
      // Set the button for the NFT
      setButton(<Button handleClick={handleSellNFT} text={'Sell'} />);
    }
  }

  // On Sell button clicked
  function handleSellNFT() {
    // Show Input to set a price
    setPriceInput(
      <div className='price-input'>
        <button className='btn btn-sm btn-dark' onClick={handleCancel}>
          X
        </button>
        <input
          value={price}
          onChange={(e) => {
            price = e.target.value;
          }}
          placeholder='Price in TATO'
          type='number'
          className='form-control'
        ></input>
      </div>
    );
    // Set Confirm button
    setButton(<Button handleClick={sellNFT} text={'Confirm'} />);
  }

  // Cancel button clicked
  function handleCancel() {
    // Hide selling option
    setPriceInput('');
    setButton(<Button handleClick={handleSellNFT} text={'Sell'} />);
  }

  // On Confirm sell button clicked
  async function sellNFT() {
    // validation
    if (!price || price < 0) return;
    // Show loader
    setLoaderHidden(false);
    // list item backend
    const listingResult = await nft_backend.listItem(id, Number(price));
    if (listingResult == 'Success!') {
      // Get the id of the nft_backend canister id
      const backendID = await nft_backend.getNftBackendCanisterId();
      console.log(NFTActor);
      // Transfer the NFT ownership to the nft_backend canister id owner
      const transferResult = await NFTActor.transferOwnership(backendID);
      console.log(transferResult);
      if (transferResult == 'Success!') {
        // Show feedback
        setOwner('NFT Market Place');
        setBlur({ filter: 'grayscale(100%)' });
        setSellStatus(<h3 className='card-subtitle mb-2 lead'>Listed</h3>);
        // hide button/input
        setButton('');
        setPriceInput('');
      }
      // Show status message
      setMsg(<p>{transferResult}</p>);
    } else {
      // Show status message
      setMsg(<p>{listingResult}</p>);
    }
    // Hide loader
    setLoaderHidden(true);
  }

  // At render
  useEffect(() => {
    loadNFT();
  }, []);

  return (
    <div className='item mb-3'>
      <div className='card bg-dark'>
        <div className='card-header bg-light'>
          <img className='card-img-top' src={image} style={blur} />
        </div>
        <div className='card-body'>
          <div hidden={loaderHidden} className='loader'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h2 className='h3 card-title'>{name}</h2>
          {sellStatus}
          <p className='card-text'>Owner: {owner}</p>
          {priceInput}
          {msg}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
