import React, { Component } from "react";
import { firebase } from "../firebase";
import { SinglePlant } from "./SinglePlant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class PlantsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      isNumericList: true,
      reverseNumericList: false,
      reverseAlphaList: false
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
          description: plants[plant].description,
          date: plants[plant].date
        });
      }
      this.setState({
        plants: newState
      });
    });
  }

  handleNumericList = () => {
    this.setState({
      isNumericList: true
    });
    if (this.state.isNumericList === true) {
      this.setState({
        reverseNumericList: !this.state.reverseNumericList
      });
    }
  };

  handleAlphaList = () => {
    this.setState({
      isNumericList: false
    });
    if (this.state.isNumericList === false) {
      this.setState({
        reverseAlphaList: !this.state.reverseAlphaList
      });
    }
  };

  render() {
    const { isNumericList, reverseAlphaList, reverseNumericList } = this.state;

    return (
      <div>
        <button className="btn--select" onClick={this.handleNumericList}>
          {reverseNumericList ? (
            <FontAwesomeIcon icon="sort-numeric-down" />
          ) : (
            <FontAwesomeIcon icon="sort-numeric-up" />
          )}
        </button>
        <button className="btn--select" onClick={this.handleAlphaList}>
          {reverseAlphaList ? (
            <FontAwesomeIcon icon="sort-alpha-up" />
          ) : (
            <FontAwesomeIcon icon="sort-alpha-down" />
          )}
        </button>
        {isNumericList === true ? (
          <div className="c-catalogue-list" id="numeric-list">
            <ol className={reverseNumericList ? null : "list--reverse"}>
              {this.state.plants
                .sort(function(a, b) {
                  if (a.date < b.date) return -1;
                  if (a.date > b.date) return 1;
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
                        plantDate={plant.date}
                      />
                    </li>
                  );
                })}
            </ol>
          </div>
        ) : (
          <div className="c-catalogue-list">
            <ul className={reverseAlphaList ? "list--reverse" : null}>
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
          </div>
        )}
      </div>
    );
  }
}
