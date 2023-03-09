import Note from './Note/Note';
import React, { useState } from 'react';

function Notes(props) {
  var col1 = [];
  var col2 = [];
  var col3 = [];
  var count = 1;

  props.notes.forEach((note) => {
    if (count === 1) {
      col1.push(createNote(note));
    } else if (count === 2) {
      col2.push(createNote(note));
    } else {
      col3.push(createNote(note));
      count = 0;
    }
    count++;
  });

  function createNote(note) {
    return (
      <Note
        key={note.id}
        id={note.id}
        title={note.title}
        content={note.content}
        onDeleteNote={props.onDeleteNote}
      />
    );
  }

  return (
    <div className='Notes'>
      <div className='notes'>
        <div className='col1'>{col1.reverse()}</div>
        <div className='col2'>{col2.reverse()}</div>
        <div className='col3'>{col3.reverse()}</div>
      </div>
    </div>
  );
}

export default Notes;
