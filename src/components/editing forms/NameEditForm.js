import React, { Component } from "react";
import { firebase } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class NameEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.plantName,
      isNameEdit: props.isNameEdit,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    const plantId = this.props.plantId;
    console.log(plantId);
    const plantsRef = firebase
      .database()
      .ref()
      .child("plants")
      .child(user.uid)
      .child(plantId);
    const name = this.state.text;
    plantsRef.update({ name });
    this.props.onUpdate();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="edit-form">
          <input
            type="text"
            name="text"
            onChange={this.handleChange}
            value={this.state.text}
            cols={40}
            className="edit-input"
          />
          <button className="btn--edit">
            <FontAwesomeIcon icon="check" />
          </button>
        </form>
      </div>
    );
  }
}
