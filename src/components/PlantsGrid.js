import React, { Component } from "react";
import { firebase } from "../firebase";
import { SinglePlant } from "./SinglePlant";
import defaultProfileImg from "../img/default-profile-img.jpg";

export class PlantsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: []
    };
  }

  componentDidMount() {
    const plantsRef = firebase
      .database()
      .ref()
      .child("plants");
    plantsRef.on("value", snapshot => {
      let plants = snapshot.val();
      let newState = [];
      for (let plant in plants) {
        newState.push({
          id: plant,
          name: plants[plant].name,
          description: plants[plant].description
        });
      }
      this.setState({
        plants: newState
      });
    });
  }

  render() {
    return (
      <div className="grid-display">
        {this.state.plants.map(plant => {
          return (
            <div className="grid-item" key={plant.id}>
              {/* <img src={defaultProfileImg} className="grid-profile-img" /> */}
              <img
                src={this.props.profileImage}
                className="grid-profile-img"
                alt="profile picture"
              />

              <SinglePlant
                plantName={plant.name}
                plantId={plant.id}
                plantDescription={plant.description}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
