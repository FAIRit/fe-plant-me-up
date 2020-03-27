import React, { Component } from "react";
import { firebase, storage } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      url: "",
      progress: 0,
      textarea: "",
      images: []
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
            const plantId = this.props.plantId;
            const plantRef = firebase.database().ref('plants').child(plantId);
            const imagesRef = plantRef.child('images');

            const image = {
              url: url,
              description: this.state.textarea
            };

            plantRef.update({ profileImage: image })
            imagesRef.push(image);

            this.setState({
              url,
              textarea: "",
              image: null,
              progress: 0,
              imageName: null
            });
          });
      }
    );
  };

  render() {
    return (
      <div className="c-image-upload">
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
              // onDrop={this.handleAddImage}
            />
          </div>
          <div className="upload-file-name">
            {this.state.imageName || (
              <p>Kliknij, aby dodać plik ze zdjęciem.</p>
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
            value={this.state.textarea}
            rows={2}
            cols={30}
          />
        </div>
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
      </div>
    );
  }
}
