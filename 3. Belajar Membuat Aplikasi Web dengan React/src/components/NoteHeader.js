import React from "react";

function NoteHeader({ searchText, eventHandler }) {
  return (
    <div className="note-app__header">
      <h1>Notes</h1>
      <input id="title" type="text" placeholder="Cari catatan ..." value={searchText} onChange={eventHandler} />
    </div>
  );
}

export default NoteHeader;
