import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { nft_backend } from '../../../declarations/nft_backend';
import Item from './Item';

function Minter() {
  const { register, handleSubmit } = useForm();
  const [nftPrincipal, setNftPrincipal] = useState('');
  const [loaderHidden, setLoaderHidden] = useState(true);

  async function onSubmit(data) {
    // Show loader
    setLoaderHidden(false);
    // Name and image from user input
    const name = data.name;
    const image = data.image[0];
    // Convert the image to bytearray
    const imageArray = await image.arrayBuffer();
    const byteArray = [...new Uint8Array(imageArray)];
    const nftId = await nft_backend.mint(byteArray, name);
    console.log(nftId.toText(), 'nft id');
    setNftPrincipal(nftId);
    // Hide loader
    setLoaderHidden(true);

    // setTimeout(() => {
    //   setLoaderHidden(true);
    // }, 2000);
  }

  if (nftPrincipal === '') {
    return (
      <div className='minter'>
        <div hidden={loaderHidden} className='loader'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <h3 className=''>Create NFT</h3>
        <h6 className=''>Upload Image</h6>
        <form noValidate='' autoComplete='off'>
          <input
            {...register('image', { required: true })}
            className='form-control'
            type='file'
            accept='image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp'
          />

          <h6 className=''>Collection Name</h6>
          <input
            {...register('name', { required: true })}
            placeholder='e.g. CryptoDunks'
            type='text'
            className='form-control'
          />

          <button onClick={handleSubmit(onSubmit)} className=''>
            Mint NFT
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div id='minter'>
        <h3 className=''>Minted!</h3>
        <div className=''>
          <Item id={nftPrincipal.toText()} />
        </div>
      </div>
    );
  }
}

export default Minter;
