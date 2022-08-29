import React from "react";

function NoteItemAction({ id, onDelete, move, archived }) {
  return (
    <div className="note-item__action">
      <button className="note-item__delete-button" onClick={() => onDelete(id)}>
        Hapus
      </button>
      <button className="note-item__archive-button" onClick={() => move(id, archived)}>
        {archived ? "Pindahkan" : "Arsipkan"}
      </button>
    </div>
  );
}

export default NoteItemAction;
