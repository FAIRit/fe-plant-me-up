import React, { Component } from 'react';
import { firebase } from '../firebase'




export class Wishlist extends Component {

    constructor() {
        super();
        this.state = {
            text: '',
            url: '',
            items: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('items');
        const item = {
            title: this.state.text,
            link: this.state.url
        }
        itemsRef.push(item);
        this.setState({
            text: '',
            url: ''
        });
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    title: items[item].title,
                    link: items[item].link
                });
            }
            this.setState({
                items: newState
            });
        });
    }

    render() {
        return (
            <div className="c-page">
                <h1>Wishlist</h1>
                <div>
                    <form onSubmit={this.handleSubmit} className="c-form" >
                        <h3>dodaj link</h3>
                        <input type="text" name="text" placeholder="dodaj kwiatka" onChange={this.handleChange} value={this.state.text} />
                        <input type="url" name="url" placeholder="dodaj link do sklepu" onChange={this.handleChange} value={this.state.url} />
                        <button className="c-btn">dodaj</button>
                        <hr />
                    </form>
                    <div>
                        <h2>lista</h2>
                        <div className="c-list-display">
                            <ul>
                                {this.state.items.map((item) => {
                                    return (
                                        <li key={item.id}>
                                            <p>{item.title}: <a href="{item.link}">{item.link}</a></p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

