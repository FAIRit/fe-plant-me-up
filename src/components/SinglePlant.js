import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SinglePlant extends Component {
  render() {
    return (
      <div className="c-single-plant">
        <Link to={`/plants/${this.props.plantId}`}>
          <h2>{this.props.plantName}</h2>
        </Link>
      </div>
    );
  }
}
