import React, { Component } from 'react';
import { firebase } from '../firebase'


export class Catalog extends Component {

    constructor() {
        super();
        this.state = {
            text: '',
            textarea: '',
            plants: []
        }
    }

    componentDidMount() {
        const plantsRef = firebase.database().ref('plants');
        plantsRef.on('value', (snapshot) => {
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
            <div className="c-page">
                <h1>Katalog roślin</h1>
                <div className="c-list-display">
                    <ul>
                        {this.state.plants.map((plant) => {
                            return (
                                <li key={plant.id}>
                                    <h3>{plant.name}</h3>
                                    <p>{plant.description}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
