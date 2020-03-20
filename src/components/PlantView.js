import React, { Component } from "react";
import { firebase } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageUpload } from "../components/ImageUpload";

export class PlantView extends Component {
  state = {
    plant: null
  };

  componentDidMount() {
    const plantId = this.props.match.params.plantId;
    const plantsRef = firebase
      .database()
      .ref()
      .child("plants")
      .child(plantId);
    plantsRef.on("value", snapshot => {
      let plant = snapshot.val();

      this.setState({
        plant
      });
    });
  }

  render() {
    return (
      <div className="c-single-plant">
        {this.state.plant === null ? (
          <p>Plant data is loading...</p>
        ) : (
          <div>
            <div className="c-single-plant-title">
              <h1>{this.state.plant.name}</h1>
              <button className="btn--edit">
                <FontAwesomeIcon icon="pencil-alt" />
              </button>
            </div>
            <div className="c-plant-view-tags">
              {this.state.plant.tags.tagMoreSun ? (
                <p>
                  <FontAwesomeIcon icon="sun" />
                </p>
              ) : null}
              {this.state.plant.tags.tagLittleSun ? (
                <p>
                  <FontAwesomeIcon icon="cloud" />
                </p>
              ) : null}
              {this.state.plant.tags.tagMoreWater ? (
                <p>
                  <FontAwesomeIcon icon="tint" />
                </p>
              ) : null}
              {this.state.plant.tags.tagLittleWater ? (
                <p>
                  <FontAwesomeIcon icon="tint-slash" />
                </p>
              ) : null}
              {this.state.plant.tags.tagSafe ? (
                <p>
                  <FontAwesomeIcon icon="paw" />
                </p>
              ) : null}
              {this.state.plant.tags.tagPoison ? (
                <p>
                  <FontAwesomeIcon icon="skull" />
                </p>
              ) : null}
            </div>
            <div className="c-single-plant-description">
              <p>{this.state.plant.description}</p>
              <button className="btn--edit">
                <FontAwesomeIcon icon="pencil-alt" />
              </button>
            </div>
            <div className="c-single-plant-gallery">
              <div className="gallery-item">
                <img
                  src={this.state.plant.gallery.image.url}
                  alt="Uploaded images"
                />
                <p>{this.state.plant.gallery.image.description}</p>
              </div>
              <div className="c-single-plant-gallery-upload gallery-item">
                <ImageUpload />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
