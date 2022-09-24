import React from "react";
import { addNote } from "../utils/network-data";
import NoteInput from "../components/NoteInput";
import { useNavigate } from "react-router-dom";

function AddPage() {
  const navigate = useNavigate();

  async function onAddNoteHandler(contact) {
    await addNote(contact);
    navigate("/");
  }

  return (
    <section className="add-new-page">
      <NoteInput addNote={onAddNoteHandler} navigate={navigate} />
    </section>
  );
}

export default AddPage;
