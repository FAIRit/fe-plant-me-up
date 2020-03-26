import React, { Component } from "react";
import { firebase } from "../firebase";
import { SinglePlant } from "./SinglePlant";
import defaultProfileImg from "../img/default-profile-img.jpg";

export class PlantsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      search: ""
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

  handleSearch = e => {
    this.setState({
      search: e.target.value.substr(0, 20)
    });
  };

  render() {
    let filteredPlants = this.state.plants.filter(plant => {
      return plant.name.indexOf(this.state.search) !== -1;
    });

    return (
      <div className="grid-display">
        <input
          type="text"
          className="input"
          placeholder="Search..."
          value={this.state.search}
          onChange={this.handleSearch}
        />
        {filteredPlants.map(plant => {
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
