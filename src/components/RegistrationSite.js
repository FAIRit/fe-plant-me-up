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

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, passwordOne } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updateProfile({ displayName: username })
          .then(() => {
            this.props.history.push("/catalog");
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });
    console.log("submitting here");
  };

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
              type="password"
              name="passwordOne"
              placeholder="hasło"
              onChange={this.handleChange}
              value={this.state.passwordOne}
              cols={40}
            />
            <br />
            <input
              type="password"
              name="passwordTwo"
              placeholder="powtórz hasło"
              onChange={this.handleChange}
              value={this.state.passwordTwo}
              cols={40}
            />
            <br />
            <button
              className={
                isInvalid
                  ? "btn login-btn login-btn--disabled"
                  : "btn login-btn"
              }
              disabled={isInvalid}
            >
              ok
            </button>
          </form>
          {this.state.error && <p>coś poszło nie tak...</p>}
        </div>
      </div>
    );
  }
}
