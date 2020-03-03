import React, { Component } from 'react';
import { firebase } from '../firebase'

export class AddForm extends Component {

    constructor() {
        super();
        this.state = {
            text: '',
            textarea: '',
            plants: []
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        });
    }

    handleSubmit= (e) => {
        e.preventDefault();
        const plantsRef = firebase.database().ref('plants');
        const plant = {
            name: this.state.text,
            description: this.state.textarea
        }
        plantsRef.push(plant);
        this.setState({
            text: '',
            textarea: ''
        });
    }


    render() {
        return (
            <div className="c-page">
                <h1>Formularz dodawania</h1>
                <div>
                    <form onSubmit={this.handleSubmit} className="c-form" >
                        <h3>dodaj roślinę</h3>
                        <input type="text" name="text" placeholder="tu wpisz nazwę" onChange={this.handleChange} value={this.state.text} />
                        <input type="textarea" name="textarea" placeholder="tu wpisz opis" onChange={this.handleChange} value={this.state.textarea} />
                        <button className="c-btn">dodaj</button>
                        <hr />
                    </form>
                </div>
            </div>

        );
    }
}