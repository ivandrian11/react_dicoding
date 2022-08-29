import React from "react";
import { getInitialData } from "../utils";
import NoteHeader from "./NoteHeader";
import NoteBody from "./NoteBody";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      searchText: "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.move = this.move.bind(this);
    this.onSearchChangeEventHandler = this.onSearchChangeEventHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
  }

  onSearchChangeEventHandler(event) {
    this.setState(() => {
      console.log(this.state.searchText);
      return {
        searchText: event.target.value,
      };
    });
  }

  onDeleteHandler(id) {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const notes = this.state.notes.filter((note) => note.id !== id);
        this.setState({ notes });
        MySwal.fire("Deleted!", "Your note has been deleted.", "success");
      }
    });
  }

  move(id, archived) {
    const notes = this.state.notes;
    notes.filter((note) => note.id === id)[0].archived = !archived;
    this.setState({ notes });
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
          },
        ],
      };
    });
  }

  render() {
    return (
      <div className="note-app">
        <NoteHeader value={this.state.searchText} eventHandler={this.onSearchChangeEventHandler} />
        <NoteBody
          notes={this.state.searchText ? this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.searchText.toLowerCase())) : this.state.notes}
          addNote={this.onAddNoteHandler}
          onDelete={this.onDeleteHandler}
          move={this.move}
        />
      </div>
    );
  }
}

export default NoteApp;
