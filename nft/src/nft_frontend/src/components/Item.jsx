import React, { useEffect, useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/nft';

function Item(props) {
  // REACT State
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [image, setImage] = useState('');

  // ID of NTF
  const id = props.id;

  const localhost = 'http://localhost:8080/';
  const agent = new HttpAgent({ host: localhost });

  // Request the NFT details
  async function loadNFT() {
    const NFTActor = await Actor.createActor(idlFactory, {
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
  }

  // At render
  useEffect(() => {
    loadNFT();
  }, []);

  return (
    <div id='item' className='card bg-dark'>
      <div className='card-header bg-light'>
        <img className='card-img-top' src={image} />
      </div>
      <div className='card-body'>
        <h2 className='h3 card-title'>{name}</h2>
        <p className='card-text'>Owner: {owner}</p>
      </div>
    </div>
  );
}

export default Item;
