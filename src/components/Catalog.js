import React, { Component } from "react";
import { PlantsList } from "./PlantsList";
import { PlantsGrid } from "./PlantsGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Catalog extends Component {
  state = {
    isDisplayModeList: true,
    isDisplayMOdeGrid: false,
  };

  toggleDisplayModeList = () => {
    this.setState({
      isDisplayModeList: true,
      isDisplayMOdeGrid: false,
    });
  };

  toggleDisplayModeGrid = () => {
    this.setState({
      isDisplayModeList: false,
      isDisplayMOdeGrid: true,
    });
  };

  render() {
    return (
      <div className="c-site-content">
        <div className="c-catalogue-title">
          <h1>Moje rośliny</h1>
          <div>
            <button
              className="btn--select"
              onClick={this.toggleDisplayModeList}
            >
              <FontAwesomeIcon icon="bars" />
            </button>
            <button
              className="btn--select"
              onClick={this.toggleDisplayModeGrid}
            >
              <FontAwesomeIcon icon="grip-horizontal" />
            </button>
          </div>
        </div>
        <div className="c-catalogue-display">
          {this.state.isDisplayModeList ? <PlantsList /> : <PlantsGrid />}
        </div>
      </div>
    );
  }
}
