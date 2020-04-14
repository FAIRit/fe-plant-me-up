import React, { Component } from "react";

export const RemovePlantConfirm = (props) => {
  return (
    <div className="modal-overlay">
      <div className="modal-body plant-added-info">
        <h2>Na pewno usunąć tę roślinę?</h2>
        <button className="btn" onClick={props.onYesButton}>
          tak
        </button>
        <button className="btn" onClick={props.onNoButton}>
          nie
        </button>
      </div>
    </div>
  );
};
