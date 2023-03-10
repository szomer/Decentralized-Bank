import React, { useEffect, useState } from 'react';
import Item from './Item';
import { Principal } from '@dfinity/principal';

function Gallery(props) {
  const [items, setItems] = useState();

  function fetchNFTs() {
    if (props.ids === undefined) return;

    setItems(
      props.ids.map((nftId) => (
        <Item
          key={nftId.toText()}
          id={nftId}
          loggedIn={props.loggedIn}
          role={props.role}
        />
      ))
    );
  }

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className='gallery'>
      <div className='title-page'>
        <h2 className='text-center'>{props.title}</h2>
      </div>
      <div className='content'>
        {items ? (
          items.map((item) => {
            return item;
          })
        ) : (
          <div className='m-3 text-center'>
            <p className='text-center'>You did not share any NFTs yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
