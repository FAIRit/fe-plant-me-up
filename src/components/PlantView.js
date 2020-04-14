import React, { Component } from "react";
import { firebase } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NameEditForm } from "../components/editing forms/NameEditForm";
import { DescriptionEditForm } from "../components/editing forms/DescriptionEditForm";
import { TagsEditForm } from "../components/editing forms/TagsEditForm";
import { SinglePlantTimeline } from "../components/SinglePlantTimeline";
import { ImageUpload } from "../components/ImageUpload";
import { ImagesGallery } from "../components/ImagesGallery";
import loader from "../components/utilities/img/loader.gif";

export class PlantView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: null,
      isNameEdit: false,
      isDescriptionEdit: false,
      isTagsEdit: false,
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

  handleDescriptionEdit = () => {
    this.setState({
      isDescriptionEdit: !this.state.isDescriptionEdit,
    });
  };

  handleTagsEdit = () => {
    this.setState({
      isTagsEdit: !this.state.isTagsEdit,
    });
  };

  render() {
    const plantId = this.props.match.params.plantId;
    return (
      <div className="c-single-plant">
        {this.state.plant === null ? (
          <div className="img-loader">
            <img
              src={loader}
              alt="data are loading..."
              className="img-loader"
            />
          </div>
        ) : (
          <div>
            <div className="c-single-plant-title">
              {!this.state.isNameEdit ? (
                <h1>{this.state.plant.name}</h1>
              ) : (
                <NameEditForm
                  plantName={this.state.plant.name}
                  plantId={plantId}
                  isNameEdit={this.state.isNameEdit}
                  onUpdate={() => this.setState({ isNameEdit: false })}
                />
              )}
              <button className="btn--edit" onClick={this.handleNameEdit}>
                <FontAwesomeIcon icon="pencil-alt" />
              </button>
            </div>
            <div className="c-plant-view-tags">
              {!this.state.isTagsEdit ? (
                <section>
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
                </section>
              ) : (
                <TagsEditForm
                  tagPoison={this.state.plant.tags.tagPoison}
                  plantId={plantId}
                  tagSafe={this.state.plant.tags.tagSafe}
                  tagMoreSun={this.state.plant.tags.tagMoreSun}
                  tagMoreWater={this.state.plant.tags.tagMoreWater}
                  tagLittleSun={this.state.plant.tags.tagLittleSun}
                  tagLittleWater={this.state.plant.tags.tagLittleWater}
                  isTagsEdit={this.state.isTagsEdit}
                  onUpdate={() => this.setState({ isTagsEdit: false })}
                />
              )}
              <button className="btn--edit" onClick={this.handleTagsEdit}>
                <FontAwesomeIcon icon="pencil-alt" />
              </button>
            </div>
            <div className="c-single-plant-description">
              {!this.state.isDescriptionEdit ? (
                <p>{this.state.plant.description}</p>
              ) : (
                <DescriptionEditForm
                  plantDescription={this.state.plant.description}
                  plantId={plantId}
                  isDescriptionEdit={this.state.isDescriptionEdit}
                  onUpdate={() => this.setState({ isDescriptionEdit: false })}
                />
              )}
              <button
                className="btn--edit"
                onClick={this.handleDescriptionEdit}
              >
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
