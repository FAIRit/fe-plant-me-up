import React, { Component } from 'react';
import { firebase } from '../firebase';
import { SinglePlant } from './SinglePlant'


export class Catalog extends Component {

    constructor(props) {
        super(props);
    this.state = {
        text: '',
        textarea: '',
        plants: []
    }
}

componentDidMount() {
    const plantsRef = firebase.database().ref().child('plants');
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
                {this.state.plants.map((plant) => {
                    return (
                             <SinglePlant plantName={plant.name}
                             plantId={plant.id}
                             key={plant.id}
                             plantDescription={plant.description}/>  
                             )
                            })
                          }
                </div>
            </div>
        );
    }
}
