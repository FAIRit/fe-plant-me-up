import React, { Component } from "react";
import { firebase, auth, provider } from "../firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class RegistrationSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      passwordOne: "",
      passwordTwo: "",
      error: null
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {};

  render() {
    const isInvalid =
      this.state.passwordOne !== this.state.passwordTwo ||
      this.state.passwordOne === "" ||
      this.state.email === "" ||
      this.state.username === "";

    return (
      <div className="c-site">
        <div className="c-login-site">
          <h3>załóż konto:</h3>
          <form onSubmit={this.handleSubmit} className="c-login-form">
            <input
              type="text"
              name="username"
              placeholder="nazwa użytkownika"
              onChange={this.handleChange}
              value={this.state.username}
              cols={40}
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder="e-mail"
              onChange={this.handleChange}
              value={this.state.email}
              cols={40}
            />
            <br />
            <input
              type="text"
              name="passwordOne"
              placeholder="hasło"
              onChange={this.handleChange}
              value={this.state.passwordOne}
              cols={40}
            />
            <br />
            <input
              type="text"
              name="passwordTwo"
              placeholder="powtórz hasło"
              onChange={this.handleChange}
              value={this.state.passwordTwo}
              cols={40}
            />
            <br />
            <button className="btn login-btn" disabled={isInvalid}>
              ok
            </button>
            {/* {error && <p>coś poszło nie tak...</p>} */}
          </form>
        </div>
      </div>
    );
  }
}
