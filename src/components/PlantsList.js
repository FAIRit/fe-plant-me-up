import React, { Component } from "react";
import { firebase } from "../firebase";
import { SinglePlant } from "./SinglePlant";
import { PlantsListNumeric } from "./PlantsListNumeric";
import { PlantsListAlphabetic } from "./PlantsListAlphabetic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class PlantsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   text: "",
      //   textarea: "",
      plants: [],
      isReverseList: true,
      isAlphaList: false
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

  handleReverseList = () => {
    this.setState({
      isReverseList: !this.state.isReverseList
    });
  };

  handleAlphaList = () => {
    this.setState({
      isAlphaList: !this.state.isAlphaList
    });
  };

  render() {
    return (
      <div>
        {this.state.isReverseList ? (
          <button className="btn" onClick={this.handleReverseList}>
            <FontAwesomeIcon icon="sort-numeric-down"></FontAwesomeIcon>
          </button>
        ) : (
          <button className="btn" onClick={this.handleReverseList}>
            <FontAwesomeIcon icon="sort-numeric-up"></FontAwesomeIcon>
          </button>
        )}
        {this.state.isAlphaList ? (
          <button className="btn" onClick={this.handleAlphaList}>
            <FontAwesomeIcon icon="sort-alpha-up"></FontAwesomeIcon>
          </button>
        ) : (
          <button className="btn" onClick={this.handleAlphaList}>
            <FontAwesomeIcon icon="sort-alpha-down"></FontAwesomeIcon>
          </button>
        )}

        <div className="list-display" id="numeric-list">
          <ol className={this.state.isReverseList ? null : "ol--reverse"}>
            {this.state.plants.map(plant => {
              return (
                <li>
                  <SinglePlant
                    plantName={plant.name}
                    plantId={plant.id}
                    key={plant.id}
                    plantDescription={plant.description}
                  />
                </li>
              );
            })}
          </ol>
        </div>
        {/* <div className="list-display">
          <ul className={this.state.isReverseList ? "ol--reverse" : null}>
            {this.state.plants
              .sort(function(a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              })
              .map(plant => {
                return (
                  <li>
                    <SinglePlant
                      plantName={plant.name}
                      plantId={plant.id}
                      key={plant.id}
                      plantDescription={plant.description}
                    />
                  </li>
                );
              })}
          </ul>
        </div> */}
      </div>
    );
  }
}
