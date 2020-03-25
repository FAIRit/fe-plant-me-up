import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SinglePlant extends Component {
  render() {
    return (
      <div className="c-single-plant">
        <h2>
          {this.props.plantName}
          <Link to={`/plants/${this.props.plantId}`}>&#10152;</Link>
        </h2>
      </div>
    );
  }
}
