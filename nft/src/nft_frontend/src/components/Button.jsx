import React from 'react';

function Button(props) {
  return (
    <button className='Button' onClick={props.handleClick}>
      {props.text}
    </button>
  );
}

export default Button;
