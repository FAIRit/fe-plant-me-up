import React, { Component } from "react";
import { firebase } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GalleryModal } from "./utilities/GalleryModal";
import { ProfileImage } from "./utilities/ProfileImage";

export class ImagesGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      showModal: false,
      image: null,
      profileImage: null
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

  handleShowModal = image => {
    const isMobile = window.innerWidth < 480;
    if (isMobile === false) {
      this.setState({
        showModal: true,
        image
      });
    }
  };

  showProfileImage = () => {
    const images = this.state.images;
    console.log(images);
    this.setState({
      profileImage: this.state.images[images.length - 1].url
    });
    console.log(this.state.profileImage);
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
    console.log("close");
  };

  handleRemoveImage(imageId) {
    const plantId = this.props.plantId;
    const imageRef = firebase
      .database()
      .ref(`plants/${plantId}/images/${imageId}`);

    imageRef.remove();
  }

  render() {
    return (
      <div className="c-single-plant-gallery">
        {this.state.images.map(image => {
          return (
            <div className="gallery-item" key={image.id}>
              <img
                src={image.url}
                url={image.url}
                alt="Uploaded images"
                onClick={() => this.handleShowModal(image)}
              />

              <p>{image.description}</p>
              <button
                className="btn--remove image--remove"
                onClick={() => this.handleRemoveImage(image.id)}
              >
                <FontAwesomeIcon icon="trash" />
              </button>
            </div>
          );
        })}

        {this.state.showModal && (
          <GalleryModal
            url={this.state.image.url}
            description={this.state.image.description}
            onClick={this.handleCloseModal}
            removeImage={() => this.handleRemoveImage(this.state.image.id)}
          />
        )}
        <div>
          <button onClick={this.showProfileImage} />
        </div>
      </div>
    );
  }
}
