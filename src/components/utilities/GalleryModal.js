import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const GalleryModal = props => {
  return (
    <div className="modal-overlay" onClick={props.onClick}>
      <div className="modal-body">
        <button className="btn--remove modal--close" onClick={props.onClick}>
          <FontAwesomeIcon icon="times-circle" />
        </button>
        <img src={props.url} alt="bigger" />
        <p>{props.description}</p>
        <button
          className="btn--remove modal--remove"
          onClick={props.removeImage}
        >
          <FontAwesomeIcon icon="trash" />
        </button>
      </div>
    </div>
  );
};
