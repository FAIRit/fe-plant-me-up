import React, { Component } from "react";
import { Link } from "react-router-dom";

export const PlantAddedInfo = (props) => {
  return (
    <div className="modal-overlay">
      <div className="modal-body plant-added-info">
        <h2>Roślina została dodana!</h2>
        <button className="btn" onClick={props.onClick}>
          dodaj kolejną roślinę
        </button>
        <button className="btn">
          <Link to={"/"}>przejdź do katalogu</Link>
        </button>
      </div>
    </div>
  );
};
