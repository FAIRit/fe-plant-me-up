import React, { Component } from "react";
import { firebase } from "../firebase";
import { SinglePlant } from "./SinglePlant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class PlantsListNumeric extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      isReverseList: false
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

  render() {
    return (
      <div>
        {this.state.isReverseList ? (
          <button className="btn" onClick={this.handleReverseList}>
            <FontAwesomeIcon icon="sort-numeric-up"></FontAwesomeIcon>
          </button>
        ) : (
          <button className="btn" onClick={this.handleReverseList}>
            <FontAwesomeIcon icon="sort-numeric-down"></FontAwesomeIcon>
          </button>
        )}
        <div className="list-display">
          <ol className={this.state.isReverseList ? "ol--reverse" : null}>
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
      </div>
    );
  }
}
