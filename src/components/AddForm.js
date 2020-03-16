import React, { Component } from "react";
import { firebase, storage } from "../firebase";

export class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      textarea: "",
      tagPoison: false,
      tagSafe: false,
      tagMoreSun: false,
      tagMoreWater: false,
      tagLittleSun: false,
      tagLittleWater: false,
      image: null,
      url: "",
      progress: 0,
      imgTextarea: "",
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

  handleCheckbox = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  handleAddImage = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
    const imageName = e.target.files[0].name;
    this.setState({ imageName });
    console.log(imageName);
  };

  handleImgDescription = e => {
    this.setState({
      imgTextarea: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // error function ....
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            const plantsRef = firebase.database().ref("plants");
            const plant = {
              name: this.state.text,
              description: this.state.textarea,
              tags: {
                tagLittleSun: this.state.tagLittleSun,
                tagMoreSun: this.state.tagMoreSun,
                tagLittleWater: this.state.tagLittleWater,
                tagMoreWater: this.state.tagMoreWater,
                tagSafe: this.state.tagSafe,
                tagPoison: this.state.tagPoison
              },
              gallery: {
                image: {
                  url: url,
                  description: this.state.imgTextarea
                }
              }
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
              imgTextarea: "",
              image: null,
              progress: 0,
              imageName: ""
            });
          });
      }
    );
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
              cols={40}
            />
            <br />
            <section className="c-form-tags">
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
            </section>
            <div className="c-page-image-upload">
              <div className="c-image-upload--form">
                <div className="c-image-upload--zone">
                  {this.state.imageName || (
                    <p>kliknij i wybierz lub przeciągnij plik ze zdjęciem</p>
                  )}
                  <input
                    ref={this.fileInput}
                    id="c-image-upload-input"
                    type="file"
                    onChange={this.handleAddImage}
                    onDrop={this.handleAddImage}
                  />
                </div>

                <textarea
                  type="textarea"
                  name="imgTextarea"
                  placeholder="opis zdjęcia"
                  onChange={this.handleImgDescription}
                  value={this.state.imgTextarea}
                  cols="40"
                  rows="5"
                />
              </div>
              <progress
                value={this.state.progress}
                max="100"
                className={
                  this.state.progress === 0
                    ? "progress-bar--hid"
                    : "progress-bar"
                }
              />
            </div>
            <br />
            <button className="btn">dodaj</button>
          </form>
        </div>
      </div>
    );
  }
}
