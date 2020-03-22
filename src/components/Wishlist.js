import React, { Component } from "react";
import { firebase } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Wishlist extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      url: "",
      items: []
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAddUrl = e => {
    this.setState({
      url: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.text,
      link: this.state.url
    };
    itemsRef.push(item);
    this.setState({
      text: "",
      url: ""
    });
  };

  componentDidMount() {
    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", snapshot => {
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

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  render() {
    return (
      <div className="c-page">
        <h1>Wishlist</h1>
        <div>
          <h3>dodaj link</h3>
          <form onSubmit={this.handleSubmit} className="u-form">
            <input
              type="text"
              name="text"
              placeholder="dodaj kwiatka"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <input
              type="url"
              name="url"
              placeholder="dodaj link do sklepu"
              onChange={this.handleAddUrl}
              value={this.state.url}
            />
            <button className="btn">dodaj</button>
          </form>
          <hr />
          <div>
            <h2>lista</h2>
            <div className="list-display">
              <ul>
                {this.state.items.map(item => {
                  return (
                    <li className="list-item" key={item.id}>
                      <span className="list-star">&#10045;</span>
                      <h3>{item.title}</h3>
                      <p className="list-add-text">
                        <a href="{item.link}">{item.link}</a>
                      </p>
                      <button
                        className="btn--remove"
                        onClick={() => this.removeItem(item.id)}
                      >
                        <FontAwesomeIcon icon="check-circle" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
