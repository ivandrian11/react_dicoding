import React from "react";
import { FiCheck } from "react-icons/fi";
import PropTypes from "prop-types";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onInputHandler = this.onInputHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }

  onInputHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      };
    });
  }

  onSubmitEventHandler() {
    if (!this.state.title && !this.state.body) this.props.navigate("/");
    else this.props.addNote(this.state);
  }

  render() {
    return (
      <>
        <div className="add-new-page__input">
          <input className="add-new-page__input__title" type="text" placeholder="Catatan rahasia" value={this.state.name} onChange={this.onTitleChangeEventHandler} />
          <div className="add-new-page__input__body" data-placeholder="Sebenarnya saya adalah ...." contentEditable onInput={this.onInputHandler}></div>
        </div>
        <div className="add-new-page__action">
          <button className="action" type="button" title="Simpan" onClick={this.onSubmitEventHandler}>
            <FiCheck />
          </button>
        </div>
      </>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
