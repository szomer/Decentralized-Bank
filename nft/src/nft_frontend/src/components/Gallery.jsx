import React, { useEffect, useState } from 'react';
import Item from './Item';
import { Principal } from '@dfinity/principal';

function Gallery(props) {
  const [items, setItems] = useState('');

  function fetchNFTs() {
    if (props.ids === undefined) return;

    setItems(
      props.ids.map((nftId) => <Item key={nftId.toText()} id={nftId} />)
    );
  }

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className='gallery'>
      <div className='title-page'>
        <h3 className='text-center'>Your NFTs</h3>
      </div>
      <div className='content'>
        {items ? (
          items.map((item) => {
            return item;
          })
        ) : (
          <div className='m-3'>
            <p>You did not share any NFTs yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
