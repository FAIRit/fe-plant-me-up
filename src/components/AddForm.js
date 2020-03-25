import React, { Component } from "react";
import { firebase, storage } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
              image: {
                url: url,
                description: this.state.imgTextarea
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
            alert("Dodano roślinkę!");
          });
      }
    );
  };

  render() {
    return (
      <div className="c-page">
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
            <div className="c-image-upload--form">
              <div className="c-image-upload--zone">
                <FontAwesomeIcon
                  className="upload-plus-circle"
                  icon="plus-circle"
                />
                <input
                  ref={this.fileInput}
                  id="c-image-upload-input"
                  type="file"
                  onChange={this.handleAddImage}
                  onDrop={this.handleAddImage}
                />
              </div>
              <div className="upload-file-name">
                {this.state.imageName || (
                  <p>Kliknij lub przeciągnij plik ze zdjęciem</p>
                )}
              </div>
            </div>
            <div>
              <textarea
                type="textarea"
                name="textarea"
                className="input--textarea"
                placeholder="wpisz opis zdjęcia"
                onChange={this.handleImgDescription}
                value={this.state.imgTextarea}
                rows={4}
                cols={30}
              />
            </div>

            <progress
              value={this.state.progress}
              max="100"
              className={
                this.state.progress === 0 ? "progress-bar--hid" : "progress-bar"
              }
            />
            <br />
            <button className="btn">dodaj</button>
          </form>
        </div>
      </div>
    );
  }
}
