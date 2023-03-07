import List "mo:base/List";
import Debug "mo:base/Debug";

// Class
actor DKeeper {

  // Note object
  public type Note = {
    id : Nat;
    title : Text;
    content : Text;
  };

  // Create empty(nil) list of type Note
  stable var notes : List.List<Note> = List.nil<Note>();

  // Add a new Note to the list
  public func createNote(idText : Nat, titleText : Text, contentText : Text) {

    // Create new note with the given data
    let newNote : Note = {
      id = idText;
      title = titleText;
      content = contentText;
    };

    // Overwrite notes list with the old notes list + new note value
    notes := List.push(newNote, notes);
  };

  // Return array of notes
  public query func getNotes() : async [Note] {
    // Convert the Note list to an array and return
    return List.toArray(notes);
  };

  // Delete note from list
  public func deleteNote(noteId : Nat) {
    // Overwrite the notes List without the note of the given noteid
    notes := List.filter(notes, func(note : Note) : Bool { note.id != noteId });
  };
};
