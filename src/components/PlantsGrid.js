import React, { Component } from "react";
import { firebase } from "../firebase";
import { SinglePlant } from "./SinglePlant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class PlantsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   text: "",
      //   textarea: "",
      plants: []
      //   isNumericList: true,
      //   reverseNumericList: false,
      //   reverseAlphaList: false
      // isReverseList: true,
      // isAlphaList: false
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

  //   handleNumericList = () => {
  //     this.setState({
  //       isNumericList: true
  //     });
  //     if (this.state.isNumericList === true) {
  //       this.setState({
  //         reverseNumericList: !this.state.reverseNumericList
  //       });
  //     }
  //   };

  //   handleAlphaList = () => {
  //     this.setState({
  //       isNumericList: false
  //     });
  //     if (this.state.isNumericList === false) {
  //       this.setState({
  //         reverseAlphaList: !this.state.reverseAlphaList
  //       });
  //     }
  //   };

  render() {
    // const { isNumericList, reverseAlphaList, reverseNumericList } = this.state;

    return (
      <div className="grid-display">
        {this.state.plants.map(plant => {
          return (
            <div className="grid-item">
              <SinglePlant
                plantName={plant.name}
                plantId={plant.id}
                key={plant.id}
                plantDescription={plant.description}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
