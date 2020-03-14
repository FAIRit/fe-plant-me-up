import React, { Component } from "react";
import { firebase, storage } from "../firebase";

export class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0
    };
  }

  handleAddImage = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
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
              images: {
                url: this.state.url
              }
            };
            plantsRef.push(plant);
            console.log(url);
            this.setState({ url });
          });
      }
    );
  };

  render() {
    return (
      <div className="c-page">
        <div className="c-page-image-upload">
          <div className="c-mage-upload--form">
            <input type="file" onChange={this.handleAddImage} />
            <button onClick={this.handleUpload}>Upload</button>
            <br />
            <progress value={this.state.progress} max="100" />
            <br />
          </div>
          <div className="c-image-upload--display">
            <img
              src={this.state.url || "http://via.placeholder.com/400x300"}
              alt="Uploaded images"
            />
          </div>
        </div>
      </div>
    );
  }
}
