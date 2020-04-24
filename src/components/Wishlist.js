import React, { Component } from "react";
import { firebase } from "../firebase";
import { WishItemEditForm } from "./editing forms/WishItemEditForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Wishlist extends Component {
  state = {
    text: "",
    url: "",
    imgUrl: "",
    textarea: "",
    items: [],
    idOfEditedItem: null,
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

  handleAddImgUrl = (e) => {
    this.setState({
      imgUrl: e.target.value,
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
      image: this.state.imgUrl,
      description: this.state.textarea,
    };
    itemsRef.push(item);
    this.setState({
      text: "",
      url: "",
      imgUrl: "",
      textarea: "",
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
          image: items[item].image,
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

  handleItemEdit = (itemId) => {
    this.setState({
      idOfEditedItem: itemId,
    });
  };

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
            <input
              type="url"
              name="imgUrl"
              placeholder="dodaj link do obrazka"
              onChange={this.handleAddImgUrl}
              value={this.state.imgUrl}
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
            <div className="wishlist-display">
              <ul>
                {this.state.items.map((item) => {
                  return (
                    <li className="list-item" key={item.id}>
                      {this.state.idOfEditedItem === item.id ? (
                        <WishItemEditForm
                          itemTitle={item.title}
                          itemLink={item.link}
                          itemImage={item.image}
                          itemDescription={item.description}
                          itemId={item.id}
                          idOfEditedItem={this.state.idOfEditedItem}
                          onUpdate={() =>
                            this.setState({ idOfEditedItem: null })
                          }
                        />
                      ) : (
                        <>
                          <div className="c-wishlist-item-title">
                            <span className="list-star">&#10045;</span>
                            <h3>{item.title}</h3>
                            <button
                              className="btn--edit"
                              onClick={() => this.handleItemEdit(item.id)}
                            >
                              <FontAwesomeIcon icon="pencil-alt" />
                            </button>
                            <button
                              className="btn--remove"
                              onClick={() => this.removeItem(item.id)}
                            >
                              <FontAwesomeIcon icon="times-circle" />
                            </button>
                          </div>
                          <div className="c-wishlist-item-content">
                            <p className="list-add-text">
                              <a href={item.link} className="wishlist-link">
                                {item.link}
                              </a>
                            </p>

                            {item.image ? (
                              <div className="wishlist-item-image">
                                <a href={item.image}>
                                  <img src={item.image} alt="wishlist item" />
                                </a>
                              </div>
                            ) : null}

                            <p className="list-add-text">{item.description}</p>
                          </div>
                        </>
                      )}
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
