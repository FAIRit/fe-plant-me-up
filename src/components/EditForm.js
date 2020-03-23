import React, { Component } from "react";
import { firebase } from "../firebase";

export class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.plantId.current.name
    };
  }

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const plantId = this.props.match.params.plantId;
    const newNameRef = firebase
      .database()
      .ref()
      .child("plants")
      .child(plantId)
      .push().name;
    const newName = this.state.plantId.name;
    const updates = {};
    updates["plants" + newNameRef] = newName;

    return firebase
      .database()
      .ref()
      .update(updates);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="u-form">
          <input
            type="text"
            name="text"
            placeholder="tu wpisz nazwę"
            onChange={this.handleChange}
            value={this.state.current.name}
            cols={40}
          />
          <button className="btn--edit">zapisz</button>
        </form>
      </div>
    );
  }
}
