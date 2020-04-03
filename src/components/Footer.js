import React, { Component } from "react";
import { firebase, auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Footer extends Component {
  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then((window.location = "/"));
  };

  render() {
    return (
      <header className="c-site-footer">
        <h4>Footer here.</h4>
        <button className="btn--remove" onClick={this.handleLogout}>
          wyloguj
        </button>
      </header>
    );
  }
}
