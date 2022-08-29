import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes, onDelete, move }) {
  if (notes.length !== 0) {
    return (
      <div className="notes-list">
        {notes.map((note) => (
          <NoteItem key={note.id} id={note.id} onDelete={onDelete} move={move} {...note} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="notes-list__empty-message">
        <p>Tidak ada catatan</p>
      </div>
    );
  }
}

export default NoteList;
