import React, { Component } from "react";
import { firebase, storage } from "../firebase";

export class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      textarea: "",
      // tagPoison: false,
      // tagSafe: false,
      // tagMoreSun: false,
      // tagMoreWater: false,
      // tagLittleSun: false,
      // tagLittleWater: false,
      image: null,
      url: "",
      plants: []
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAddDescription = e => {
    this.setState({
      textarea: e.target.value
    });
  };

  // handleCheckbox = e => {
  //   this.setState({
  //     [e.target.name]: e.target.checked
  //   });
  // };

  handleSubmit = e => {
    e.preventDefault();
    const plantsRef = firebase.database().ref("plants");
    const plant = {
      name: this.state.text,
      description: this.state.textarea
      // tagLittleSun: this.state.tagLittleSun,
      // tagMoreSun: this.state.tagLittleSun,
      // tagLittleWater: this.state.tagLittleWater,
      // tagMoreWater: this.state.tatagSafe,
      // tagPoison: this.state.tagPoison
    };
    plantsRef.push(plant);
    this.setState({
      text: "",
      textarea: "",
      checked: false
    });
  };

  render() {
    return (
      <div className="c-page">
        <h1>Formularz dodawania</h1>
        <div>
          <form onSubmit={this.handleSubmit} className="c-form">
            <h3>dodaj roślinę</h3>
            <input
              type="text"
              name="text"
              placeholder="tu wpisz nazwę"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <br />
            <input
              type="textarea"
              name="textarea"
              placeholder="tu wpisz opis"
              onChange={this.handleAddDescription}
              value={this.state.textarea}
            />
            <br />
            {/* <section className="c-form-tags">
              <input
                type="checkbox"
                name="tagMoreSun"
                checked={this.state.tagMoreSun}
                onChange={this.handleCheckbox}
              />
              <label htmlFor="tagMoreSun">jasno</label>
              <input
                type="checkbox"
                name="tagLittleSun"
                checked={this.state.tagLittleSun}
                onChange={this.handleCheckbox}
              />
              <label htmlFor="tagLittleSun">w cieniu</label>
              <input
                type="checkbox"
                name="tagMoreWater"
                checked={this.state.tagMoreWater}
                onChange={this.handleCheckbox}
              />
              <label htmlFor="tagMoreWater">dużo wody</label>
              <input
                type="checkbox"
                name="tagLittleWater"
                checked={this.state.tagLittleWater}
                onChange={this.handleCheckbox}
              />
              <label htmlFor="tagLittleWater">mało wody</label>
              <input
                type="checkbox"
                name="tagSafe"
                checked={this.state.tagSafe}
                onChange={this.handleCheckbox}
              />
              <label htmlFor="tagSafe">bezpieczne</label>
              <input
                type="checkbox"
                name="tagPoison"
                checked={this.state.tagPoison}
                onChange={this.handleCheckbox}
              />
              <label htmlFor="tagPoison">trujące</label>
            </section> */}

            <br />
            <button className="c-btn">dodaj</button>
          </form>
        </div>
      </div>
    );
  }
}
