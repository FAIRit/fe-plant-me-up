import React, { Component } from "react";
import { firebase } from "../firebase";
import { SinglePlant } from "./SinglePlant";
import { ProfileImage } from "./utilities/ProfileImage";
import { RemovePlantConfirm } from "../components/utilities/RemovePlantConfirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class PlantsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      search: "",
      idOfPlantToRemove: null,
    };
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    const plantsRef = firebase.database().ref().child("plants").child(user.uid);
    plantsRef.on("value", (snapshot) => {
      let plants = snapshot.val();
      let newState = [];
      for (let plant in plants) {
        newState.push({
          id: plant,
          name: plants[plant].name,
          description: plants[plant].description,
          profileImage: plants[plant].profileImage,
        });
      }
      this.setState({
        plants: newState,
      });
    });
  }

  handleSearch = (e) => {
    this.setState({
      search: e.target.value.substr(0, 20),
    });
  };

  handleRemovePlant(plantId) {
    const user = firebase.auth().currentUser;
    const plantRef = firebase
      .database()
      .ref("plants")
      .child(user.uid)
      .child(plantId);
    plantRef.remove();
    this.setState({
      idOfPlantToRemove: null,
    });
  }

  openRemoveConfirm = (plantId) => {
    this.setState({
      idOfPlantToRemove: plantId,
    });
  };

  closeRemoveConfirm = () => {
    this.setState({
      idOfPlantToRemove: null,
    });
  };

  render() {
    let filteredPlants = this.state.plants.filter((plant) => {
      return plant.name.indexOf(this.state.search) !== -1;
    });

    return (
      <>
        <div>
          <input
            type="text"
            className="input"
            placeholder="Search..."
            value={this.state.search}
            onChange={this.handleSearch}
          />
        </div>
        <div className="grid-display">
          {filteredPlants.map((plant) => {
            return (
              <div className="grid-item" key={plant.id}>
                <ProfileImage profileImage={plant.profileImage} />

                <SinglePlant
                  plantName={plant.name}
                  plantId={plant.id}
                  plantDescription={plant.description}
                />
                <button
                  className="btn--remove"
                  onClick={() => this.openRemoveConfirm(plant.id)}
                >
                  <FontAwesomeIcon icon="trash" />
                </button>
                {this.state.idOfPlantToRemove === plant.id && (
                  <RemovePlantConfirm
                    onYesButton={() => this.handleRemovePlant(plant.id)}
                    onNoButton={this.closeRemoveConfirm}
                  />
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
