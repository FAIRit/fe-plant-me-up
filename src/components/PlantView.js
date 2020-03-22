import React, { Component } from "react";
import { firebase } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SinglePlantTimeline } from "../components/SinglePlantTimeline";
import { ImageUpload } from "../components/ImageUpload";
import { ImagesGallery } from "../components/ImagesGallery";

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
            <h2>Kalendarium rośliny</h2>
            <SinglePlantTimeline />
            <h2>Galeria rośliny</h2>
            {/* <ImagesGallery /> */}
            <ImageUpload />
          </div>
        )}
      </div>
    );
  }
}
