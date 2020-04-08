import React, { Component } from "react";
import { firebase } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditForm } from "../components/EditForm";
import { SinglePlantTimeline } from "../components/SinglePlantTimeline";
import { ImageUpload } from "../components/ImageUpload";
import { ImagesGallery } from "../components/ImagesGallery";

export class PlantView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: null,

      isNameEdit: false,
    };
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    const plantId = this.props.match.params.plantId;
    const plantsRef = firebase
      .database()
      .ref()
      .child("plants")
      .child(user.uid)
      .child(plantId);

    plantsRef.on("value", (snapshot) => {
      let plant = snapshot.val();

      this.setState({
        plant,
      });
    });
  }

  handleNameEdit = () => {
    this.setState({
      isNameEdit: !this.state.isNameEdit,
    });
  };

  render() {
    return (
      <div className="c-single-plant">
        {this.state.plant === null ? (
          <p>Plant data is loading...</p>
        ) : (
          <div>
            <div className="c-single-plant-title">
              {!this.state.isNameEdit ? (
                <h1>{this.state.plant.name}</h1>
              ) : (
                <EditForm
                  plantName={this.state.plant.name}
                  plantId={this.state.plant.id}
                  isNameEdit={this.state.isNameEdit}
                />
              )}
              <button className="btn--edit" onClick={this.handleNameEdit}>
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
            <h2>Kalendarium</h2>
            <SinglePlantTimeline plantId={this.props.match.params.plantId} />
            <h2>Galeria</h2>
            <ImagesGallery plantId={this.props.match.params.plantId} />
            <ImageUpload plantId={this.props.match.params.plantId} />
          </div>
        )}
      </div>
    );
  }
}
