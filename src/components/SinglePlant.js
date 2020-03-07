import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SinglePlant extends Component {
  render() {
    return (
      <div className="c-single-plant">
        <h3>{this.props.plantName}</h3>
        <Link to={`/plants/${this.props.plantId}`}>details</Link>
      </div>
    );
  }
}
