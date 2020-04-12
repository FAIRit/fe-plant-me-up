import React, { Component } from "react";
import { firebase } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class DescriptionEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textarea: props.plantDescription,
      isDescriptionEdit: props.isDescriptionEdit,
    };
  }

  handleChange = (e) => {
    this.setState({
      textarea: e.target.value,
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
    const description = this.state.textarea;
    plantsRef.update({ description });
    this.props.onUpdate();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="u-form">
          <textarea
            type="textarea"
            name="textarea"
            onChange={this.handleChange}
            value={this.state.textarea}
            rows={5}
            cols={30}
          />
          <button className="btn--edit">
            <FontAwesomeIcon icon="check" />
          </button>
        </form>
      </div>
    );
  }
}
