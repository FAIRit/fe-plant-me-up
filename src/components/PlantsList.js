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
      reverseAlphaList: false,
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
          description: plants[plant].description,
          date: plants[plant].date
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

    let filteredPlants = this.state.plants.filter(plant => {
      return plant.name.indexOf(this.state.search) !== -1;
    });

    return (
      <div>
        <div>
          <input
            type="text"
            className="input"
            placeholder="Search..."
            value={this.state.search}
            onChange={this.handleSearch}
          />
          <button className="btn--select" onClick={this.handleNumericList}>
            {reverseNumericList ? (
              <FontAwesomeIcon icon="sort-numeric-up" />
            ) : (
              <FontAwesomeIcon icon="sort-numeric-down" />
            )}
          </button>
          <button className="btn--select" onClick={this.handleAlphaList}>
            {reverseAlphaList ? (
              <FontAwesomeIcon icon="sort-alpha-up" />
            ) : (
              <FontAwesomeIcon icon="sort-alpha-down" />
            )}
          </button>
        </div>
        {isNumericList === true ? (
          <div className="c-catalogue-list" id="numeric-list">
            <ol className={reverseNumericList ? "list--reverse" : null}>
              {filteredPlants
                .sort(function(a, b) {
                  if (a.date < b.date) return -1;
                  if (a.date > b.date) return 1;
                  return 0;
                })
                .map(plant => {
                  return (
                    <li key={plant.id}>
                      <SinglePlant
                        plantName={plant.name}
                        plantId={plant.id}
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
                    <li key={plant.id}>
                      <SinglePlant
                        plantName={plant.name}
                        plantId={plant.id}
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
