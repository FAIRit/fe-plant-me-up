import React, { Component } from "react";
import { firebase } from "../firebase";
import exit from "../components/utilities/img/exit.png";

export class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {window.location = "/"});
  };

  render() {
    return (
      <footer className="c-site-footer">
        <div className="o-container c-footer-nav">
          <h4>2020 &#169; plant me up.</h4>
          {this.props.user && (
            <button className="btn" onClick={this.handleLogout} id="logOut">
              <img src={exit} alt="log out" />
            </button>
          )}
        </div>
      </footer>
    );
  }
}
