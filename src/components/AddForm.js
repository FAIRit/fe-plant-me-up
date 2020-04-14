import React, { Component } from "react";
import { firebase } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      textarea: "",
      date: firebase.database.ServerValue.TIMESTAMP,
      tagPoison: false,
      tagSafe: false,
      tagMoreSun: false,
      tagMoreWater: false,
      tagLittleSun: false,
      tagLittleWater: false,
      plants: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleAddDescription = (e) => {
    this.setState({
      textarea: e.target.value,
    });
  };

  handleCheckbox = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    const plantsRef = firebase.database().ref("plants").child(user.uid);
    const plant = {
      name: this.state.text,
      description: this.state.textarea,
      date: this.state.date,
      tags: {
        tagLittleSun: this.state.tagLittleSun,
        tagMoreSun: this.state.tagMoreSun,
        tagLittleWater: this.state.tagLittleWater,
        tagMoreWater: this.state.tagMoreWater,
        tagSafe: this.state.tagSafe,
        tagPoison: this.state.tagPoison,
      },
    };
    plantsRef.push(plant);
    this.setState({
      text: "",
      textarea: "",
      tagPoison: false,
      tagSafe: false,
      tagMoreSun: false,
      tagMoreWater: false,
      tagLittleSun: false,
      tagLittleWater: false,
    });
    alert("Dodano roślinkę!");
  };

  render() {
    return (
      <div className="c-site-content">
        <h1>Dodaj nową roślinę:</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="text"
              placeholder="tu wpisz nazwę"
              onChange={this.handleChange}
              value={this.state.text}
              cols={40}
            />
            <br />
            <textarea
              type="textarea"
              name="textarea"
              placeholder="tu wpisz opis"
              onChange={this.handleAddDescription}
              value={this.state.textarea}
              rows={5}
              cols={30}
            />
            <br />
            <section className="c-form-tags">
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

            <br />
            <button className="btn">dodaj</button>
          </form>
        </div>
      </div>
    );
  }
}
