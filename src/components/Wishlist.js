import React, { Component } from "react";
import { firebase } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Wishlist extends Component {
  state = {
    text: "",
    url: "",
    textarea: "",
    items: [],
  };

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleAddUrl = (e) => {
    this.setState({
      url: e.target.value,
    });
  };

  handleAddDescription = (e) => {
    this.setState({
      textarea: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    const itemsRef = firebase.database().ref("items").child(user.uid);
    const item = {
      title: this.state.text,
      link: this.state.url,
      description: this.state.textarea,
    };
    itemsRef.push(item);
    this.setState({
      text: "",
      url: "",
    });
  };

  componentDidMount() {
    const user = firebase.auth().currentUser;
    const itemsRef = firebase.database().ref("items").child(user.uid);
    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          link: items[item].link,
          description: items[item].description,
        });
      }
      this.setState({
        items: newState,
      });
    });
  }

  removeItem(itemId) {
    const user = firebase.auth().currentUser;
    const itemRef = firebase
      .database()
      .ref("items")
      .child(user.uid)
      .child(itemId);
    itemRef.remove();
  }

  render() {
    return (
      <div className="c-site-content">
        <h1>wishlist</h1>
        <div>
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
            <textarea
              type="textarea"
              name="textarea"
              placeholder="tu wpisz opis"
              onChange={this.handleAddDescription}
              value={this.state.textarea}
              rows={2}
              cols={30}
            />
            <button className="btn">dodaj</button>
          </form>
          <hr />
          <div>
            <div className="list-display">
              <ul>
                {this.state.items.map((item) => {
                  return (
                    <li className="list-item" key={item.id}>
                      <span className="list-star">&#10045;</span>
                      <h3>{item.title}</h3>
                      <p className="list-add-text">
                        <a href="{item.link}">{item.link}</a>
                      </p>
                      <p className="list-add-text">{item.description}</p>
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
