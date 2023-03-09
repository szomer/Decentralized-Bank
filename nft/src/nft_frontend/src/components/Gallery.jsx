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
      <div className='container'>
        <div className='row d-flex justify-content-center'>
          {items ? (
            items.map((item) => {
              return <div className='col-md-3 m-3'>{item}</div>;
            })
          ) : (
            <div className='col-md-5 m-3'>
              <p>You did not share any NFTs yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
