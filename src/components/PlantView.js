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
            <h1>{this.state.plant.name}</h1>
            <p>{this.state.plant.description}</p>
            <h4>tagi:</h4>
            <ul>
              {this.state.plant.tags.tagMoreSun ? <li>więcej słońca</li> : null}
              {this.state.plant.tags.tagLittleSun ? <li>mało słońca</li> : null}
              {this.state.plant.tags.tagMoreWater ? <li>dużo wody</li> : null}
              {this.state.plant.tags.tagLittleWater ? <li>mało wody</li> : null}
              {this.state.plant.tags.tagSafe ? <li>bezpieczna</li> : null}
              {this.state.plant.tags.tagPoison ? <li>trująca</li> : null}
            </ul>
            {/* <img src={this.state.url} alt="Uploaded images" /> */}
          </div>
        )}
      </div>
    );
  }
}
