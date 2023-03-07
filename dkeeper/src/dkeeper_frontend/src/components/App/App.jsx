import Header from '../Header/Header';
import Notes from '../Notes/Notes';
import TextInput from '../TextInput/TextInput';
import React, { useState, useEffect } from 'react';

// DKeeper_Backend
import { dkeeper_backend } from '../../../../declarations/dkeeper_backend';

function App() {
  // Store notes and function for accessing notes
  var [notes, setNotes] = useState([]);

  // useEffect -> everytime the render function gets called
  useEffect(() => {
    // Call the async function to get the notes
    fetchData();
  }, []);

  // Get notes
  async function fetchData() {
    // get notes from the backend
    const fetchedNotes = await dkeeper_backend.getNotes();
    // store notes in react state
    setNotes(fetchedNotes);
  }

  // Add note
  function addNote(e, newNote) {
    // Prevent default after button clicked
    e.preventDefault();

    // Set the ID
    newNote.id = notes.length;

    // Add the new note to the list
    setNotes((prevNotes) => {
      dkeeper_backend.createNote(newNote.id, newNote.title, newNote.content);
      return [...prevNotes, newNote];
    });
  }

  // Delete note of given id
  function deleteNote(e, deleteNoteId) {
    // Prevent default after button clicked
    e.preventDefault();

    dkeeper_backend.deleteNote(deleteNoteId);

    // Delete the note that equals the given note id
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== deleteNoteId;
      });
    });
  }

  return (
    <div className='App'>
      <Header />
      <TextInput onSubmitNote={addNote} />
      <Notes notes={notes} onDeleteNote={deleteNote} />
    </div>
  );
}

export default App;
