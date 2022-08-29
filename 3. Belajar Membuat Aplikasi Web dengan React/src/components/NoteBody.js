import React from "react";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";

function NoteBody({ notes, addNote, onDelete, move }) {
  return (
    <div className="note-app__body">
      <NoteInput addNote={addNote} />
      <h2>Catatan Aktif</h2>
      <NoteList notes={notes.filter((note) => !note.archived)} onDelete={onDelete} move={move} />
      <h2>Arsip</h2>
      <NoteList notes={notes.filter((note) => note.archived)} onDelete={onDelete} move={move} />
    </div>
  );
}

export default NoteBody;
