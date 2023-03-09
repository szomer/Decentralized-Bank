import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';

function TextInput(props) {
  const [note, setNote] = useState({
    title: '',
    content: '',
  });
  const [isExpanded, setExpand] = useState(false);

  function onInputChange(e) {
    const { name, value } = e.target;

    setNote((prevNote) => {
      return {
        ...prevNote, // the previous note
        [name]: value, // overwrite the changed property
      };
    });
  }

  function onExpand() {
    setExpand(true);
  }

  return (
    <div className='TextInput'>
      <div className='input-box'>
        <form>
          {isExpanded && (
            <input
              onChange={onInputChange}
              value={note.title}
              name='title'
              placeholder='Title'
            />
          )}

          <textarea
            onClick={onExpand}
            onChange={onInputChange}
            value={note.content}
            name='content'
            rows={isExpanded ? 6 : 1}
            placeholder='Take a note...'
          ></textarea>
          <Zoom in={isExpanded}>
            <Fab
              onClick={(e) => {
                props.onSubmitNote(e, note);
                setNote({ title: '', content: '' });
              }}
            >
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </div>
    </div>
  );
}

export default TextInput;
