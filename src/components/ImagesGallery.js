import React, { Component } from "react";
import { firebase, storage } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class ImagesGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    };
  }

  componentDidMount() {
    const imagesRef = firebase.database().ref("images");
    imagesRef.on("value", snapshot => {
      let images = snapshot.val();
      let newState = [];
      for (let image in images) {
        newState.push({
          id: image,
          url: images[image].url,
          description: images[image].description
        });
      }
      this.setState({
        images: newState
      });
    });
  }

  render() {
    return (
      <div className="c-single-plant-gallery">
        <div className="c-single-page-images-display">
          {this.state.images.map(image => {
            return (
              <div className="gallery-item" key={image.id}>
                <img src={this.state.image.url} alt="Uploaded images" />
                <p>{this.state.image.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
