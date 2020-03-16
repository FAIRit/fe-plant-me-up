import React, { Component } from "react";
import { firebase, storage } from "../firebase";

export class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      url: "",
      progress: 0,
      textarea: ""
    };
  }

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
      textarea: e.target.value
    });
  };

  handleUpload = () => {
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
              gallery: {
                image: {
                  url: url,
                  description: this.state.textarea
                }
              }
            };
            plantsRef.push(plant);
            console.log(url);
            this.setState({
              url,
              textarea: "",
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
        <div className="c-page-image-upload">
          <div className="c-image-upload--form">
            <div className="c-image-upload--zone">
              {this.state.imageName || (
                <p>kliknij i wybierz lub przeciągnij plik</p>
              )}
              <input
                ref={this.fileInput}
                id="c-image-upload-input"
                type="file"
                onChange={this.handleAddImage}
                onDrop={this.handleAddImage}
              />
            </div>

            <br />
            <input
              type="textarea"
              name="textarea"
              placeholder="tu wpisz opis"
              onChange={this.handleImgDescription}
              value={this.state.textarea}
            />

            <button onClick={this.handleUpload} className="btn">
              dodaj
            </button>
            <br />

            <progress
              value={this.state.progress}
              max="100"
              className={
                this.state.progress === 0 ? "progress-bar--hid" : "progress-bar"
              }
            />
            <br />
          </div>
          <div className="c-image-upload--display">
            <img src={this.state.url} />
          </div>
        </div>
      </div>
    );
  }
}
