import React, { Component } from "react";
import { firebase, auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class LoginSite extends Component {
  state = {};

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleSubmit() {}

  render() {
    return (
      <>
        <div className="c-login-site">
          <h3>Zaloguj się:</h3>
          <form onSubmit={this.handleSubmit} className="c-login-form">
            <input
              type="text"
              name="userText"
              placeholder="user"
              onChange={this.handleChange}
              value={this.state.text}
              cols={40}
            />
            <br />
            <input
              type="text"
              name="passText"
              placeholder="hasło"
              onChange={this.handleChange}
              value={this.state.text}
              cols={40}
            />
            <br />
            <button className="btn login-btn">zaloguj</button>
          </form>
        </div>
      </>
    );
  }
}
