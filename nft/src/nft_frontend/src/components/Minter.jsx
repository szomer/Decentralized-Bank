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
          <h2 className='text-center'>Create NFT</h2>
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
              className='form-control mb-3 bg-dark text-light'
              type='file'
              accept='image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp'
            />

            <label className='form-label'>Collection Name</label>
            <input
              {...register('name', { required: true })}
              placeholder='e.g. CryptoDunks'
              type='text'
              className='form-control mb-3 bg-dark text-light'
            />
            <hr className='my-4' />

            <button
              onClick={handleSubmit(onSubmit)}
              className='btn btn-dark w-100'
            >
              Mint NFT
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className='minter'>
        <div className='title-page'>
          <h2 className='text-center'>NFT Minted !</h2>
        </div>
        <div className='content d-flex justify-content-center'>
          <Item key={nftPrincipal.toText()} id={nftPrincipal} />
        </div>
      </div>
    );
  }
}

export default Minter;
