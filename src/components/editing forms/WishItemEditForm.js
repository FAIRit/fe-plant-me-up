import React, { Component } from "react";
import { firebase } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class WishItemEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.itemTitle,
      url: props.itemLink,
      imgUrl: props.itemImage,
      textarea: props.itemDescription,
      isWishItemEdit: props.isWishItemEdit,
    };
  }

  handleAddTitle = (e) => {
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
    const itemId = this.props.itemId;
    const itemsRef = firebase
      .database()
      .ref("items")
      .child(user.uid)
      .child(itemId);
    const title = this.state.text;
    const link = this.state.url;
    const image = this.state.imgUrl;
    const description = this.state.textarea;
    itemsRef.update({
      title,
      link,
      image,
      description,
    });
    this.props.onUpdate();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="u-form">
        <input
          type="text"
          name="text"
          placeholder="dodaj kwiatka"
          onChange={this.handleAddTitle}
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
        <button className="btn--edit">
          <FontAwesomeIcon icon="check" />
        </button>
      </form>
    );
  }
}
