import React from 'react';
import Item from './Item';

function App() {
  const nftId = 'renrk-eyaaa-aaaaa-aaada-cai';

  return (
    <div id='App'>
      <h1>Hi</h1>
      <Item id={nftId} />
    </div>
  );
}

export default App;
