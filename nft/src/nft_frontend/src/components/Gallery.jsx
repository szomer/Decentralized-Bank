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

  return <div id='gallery'>{items}</div>;
}

export default Gallery;
