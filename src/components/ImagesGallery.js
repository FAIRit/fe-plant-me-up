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
    const plantId = this.props.plantId;
    const imagesRef = firebase.database().ref(`plants/${plantId}/images`);
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
        {this.state.images.map(image => {
          return (
            <div className="gallery-item">
              <img key={image.id} src={image.url} alt="Uploaded images" />
              <p>{image.description}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
