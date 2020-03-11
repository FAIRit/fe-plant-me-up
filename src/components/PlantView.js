import React, { Component } from "react";
import { firebase, storage } from "../firebase";

export class PlantView extends Component {
  state = {
    plant: null
  };

  componentDidMount() {
    const plantId = this.props.match.params.plantId;
    const plantsRef = firebase
      .database()
      .ref()
      .child("plants")
      .child(plantId);
    plantsRef.on("value", snapshot => {
      let plant = snapshot.val();

      this.setState({
        plant
      });
      // const UploadRef = storage
      //   .ref("${this.props.plantId}")
      //   .child(image.name)
      //   .getDownloadURL()
      //   .then(url => {
      //     console.log(url);
      //     this.setState({ url });
      //   });
    });
  }

  render() {
    return (
      <div className="c-single-plant">
        {this.state.plant === null ? (
          <p>Plant data is loading...</p>
        ) : (
          <div>
            <h3>{this.state.plant.name}</h3>
            {this.state.plant.description}
            {/* <img src={this.state.url} alt="Uploaded images" /> */}
          </div>
        )}
      </div>
    );
  }
}
