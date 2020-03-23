import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const GalleryModal = props => {
  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <button className="btn--remove" onClick={props.closeModal}>
          <FontAwesomeIcon icon="times-circle" />
        </button>
        <img src={props.url} />
      </div>
    </div>
  );
};
