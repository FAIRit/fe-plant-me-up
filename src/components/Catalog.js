import React, { Component } from "react";
import { PlantsList } from "./PlantsList";
import { PlantsGrid } from "./PlantsGrid";
// import { Search } from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Catalog extends Component {
  state = {
    displayMode: true
  };

  toggleDisplayMode = () => {
    this.setState({
      displayMode: !this.state.displayMode
    });
  };

  render() {
    return (
      <div className="c-page">
        {/* <Search /> */}
        <div className="c-catalogue-title">
          <h1>Moje rośliny</h1>
          <div>
            <button className="btn--select" onClick={this.toggleDisplayMode}>
              <FontAwesomeIcon icon="bars" />
            </button>
            <button className="btn--select" onClick={this.toggleDisplayMode}>
              <FontAwesomeIcon icon="grip-horizontal" />
            </button>
          </div>
        </div>
        <div className="c-catalogue-display">
          {this.state.displayMode ? (
            <PlantsList plants={this.state.plants} />
          ) : (
            <PlantsGrid plants={this.state.plants} />
          )}
        </div>
      </div>
    );
  }
}
