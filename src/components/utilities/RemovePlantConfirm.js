import React from "react";

export const RemovePlantConfirm = (props) => {
  return (
    <div className="remove-popup-overlay">
      <div className="remove-popup-body">
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
