import React from "react";
import NoteItemContent from "./NoteItemContent";
import NoteItemAction from "./NoteItemAction";

function NoteItem({ title, createdAt, body, archived, id, onDelete, move }) {
  return (
    <div className="note-item">
      <NoteItemContent title={title} createdAt={createdAt} body={body} />
      <NoteItemAction id={id} onDelete={onDelete} archived={archived} move={move} />
    </div>
  );
}

export default NoteItem;
