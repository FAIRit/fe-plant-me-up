import React, { Component } from "react";
import { firebase, storage } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GalleryModal } from "./utilities/GalleryModal";

export class ImagesGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      showModal: false
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

  handleShowModal = () => {
    this.setState({
      showModal: true
    });
    console.log("click");
  };

  closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className="c-single-plant-gallery">
        {this.state.images.map(image => {
          return (
            <div className="gallery-item" key={image.id}>
              <img
                src={image.url}
                url={image.url}
                alt="Uploaded images"
                onClick={this.handleShowModal}
              />
              <p>{image.description}</p>
            </div>
          );
        })}
        {this.state.showModal && <GalleryModal onClick={this.closeModal} />}
      </div>
    );
  }
}
