import React from "react";
import PropTypes from "prop-types";
import { FiMove, FiTrash } from "react-icons/fi";
import { showFormattedDate } from "../utils/index";
import parse from "html-react-parser";

function NoteDetail({ id, title, body, createdAt, archived, onDelete, move }) {
  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAtt">{showFormattedDate(createdAt)}</p>
      <div className="detail-page__body">{parse(body)}</div>
      <div className="detail-page__action">
        <button className="action" type="button" onClick={() => move(id, archived)}>
          <FiMove />
        </button>
        <button className="action" type="button" onClick={() => onDelete(id)}>
          <FiTrash />
        </button>
      </div>
    </section>
  );
}

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
};

export default NoteDetail;
