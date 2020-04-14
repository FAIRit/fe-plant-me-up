import React, { Component } from "react";
import { firebase } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class TagsEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagPoison: props.tagPoison,
      tagSafe: props.tagSafe,
      tagMoreSun: props.tagMoreSun,
      tagMoreWater: props.tagMoreWater,
      tagLittleSun: props.tagLittleSun,
      tagLittleWater: props.tagLittleWater,
      isTagsEdit: props.isTagseEdit,
    };
  }

  handleCheckbox = (e) => {
    this.setState({
      text: e.target.value,
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
      .child(plantId)
      .child("tags");
    const tagPoison = this.state.tagPoison;
    const tagSafe = this.state.tagSafe;
    const tagMoreSun = this.state.tagMoreSun;
    const tagMoreWater = this.state.tagMoreWater;
    const tagLittleSun = this.state.tagLittleSun;
    const tagLittleWater = this.state.tagLittleWater;
    plantsRef.update({
      tagPoison,
      tagSafe,
      tagMoreSun,
      tagMoreWater,
      tagLittleSun,
      tagLittleWater,
    });
    this.props.onUpdate();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="c-form-tags edit-form">
          <section>
            <input
              type="checkbox"
              name="tagMoreSun"
              checked={this.state.tagMoreSun}
              onChange={this.handleCheckbox}
            />
            <label htmlFor="tagMoreSun">
              <FontAwesomeIcon icon="sun" />
            </label>
            <input
              type="checkbox"
              name="tagLittleSun"
              checked={this.state.tagLittleSun}
              onChange={this.handleCheckbox}
            />
            <label htmlFor="tagLittleSun">
              <FontAwesomeIcon icon="cloud" />
            </label>
            <input
              type="checkbox"
              name="tagMoreWater"
              checked={this.state.tagMoreWater}
              onChange={this.handleCheckbox}
            />
            <label htmlFor="tagMoreWater">
              <FontAwesomeIcon icon="tint" />
            </label>
            <input
              type="checkbox"
              name="tagLittleWater"
              checked={this.state.tagLittleWater}
              onChange={this.handleCheckbox}
            />
            <label htmlFor="tagLittleWater">
              <FontAwesomeIcon icon="tint-slash" />
            </label>
            <input
              type="checkbox"
              name="tagSafe"
              checked={this.state.tagSafe}
              onChange={this.handleCheckbox}
            />
            <label htmlFor="tagSafe">
              <FontAwesomeIcon icon="paw" />
            </label>
            <input
              type="checkbox"
              name="tagPoison"
              checked={this.state.tagPoison}
              onChange={this.handleCheckbox}
            />
            <label htmlFor="tagPoison">
              <FontAwesomeIcon icon="skull" />
            </label>
          </section>
          <button className="btn--edit">
            <FontAwesomeIcon icon="check" />
          </button>
        </form>
      </div>
    );
  }
}
