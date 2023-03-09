import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';

function Note(props) {
  return (
    <div className='note'>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={(e) => {
          props.onDeleteNote(e, props.id);
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
