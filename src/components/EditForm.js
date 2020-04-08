import React, { Component } from "react";
import { firebase } from "../firebase";

export class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.plantName,
      isNameEdit: props.isNameEdit,
    };
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    const plantId = this.props.match.params.plantId;
    const plantsRef = firebase
      .database()
      .ref()
      .child("plants")
      .child(user.uid)
      .child(plantId);
    const name = this.state.text;
    plantsRef.update(name);
    this.setState = {
      isNameEdit: false,
    };
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="u-form">
          <input
            type="text"
            name="text"
            onChange={this.handleChange}
            value={this.state.text}
            cols={40}
          />
          <button className="btn--edit">zapisz</button>
        </form>
      </div>
    );
  }
}
