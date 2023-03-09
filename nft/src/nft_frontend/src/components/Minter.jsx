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
        <div className='title-page'>
          <h3 className='text-center'>Create NFT</h3>
        </div>
        <div className='content'>
          <div hidden={loaderHidden} className='loader'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <form noValidate='' autoComplete='off'>
            <label className='form-label'>Upload Image</label>
            <input
              {...register('image', { required: true })}
              className='form-control mb-3'
              type='file'
              accept='image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp'
            />

            <label className='form-label'>Collection Name</label>
            <input
              {...register('name', { required: true })}
              placeholder='e.g. CryptoDunks'
              type='text'
              className='form-control mb-3'
            />
            <hr />

            <button
              onClick={handleSubmit(onSubmit)}
              className='btn btn-light w-100'
            >
              Mint NFT
            </button>
          </form>
        </div>
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
