import React, { Component } from "react";
import { firebase } from "../firebase";
import { Link } from "react-router-dom";

export class LoginSite extends Component {
  state = {
    email: "",
    password: "",
    isPasswordForgotten: false,
    emailForgPass: "",
    isResetEmailSend: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ error });
      });
    console.log("zalogowano");
  };

  handleForgottenPassword = () => {
    this.setState({
      isPasswordForgotten: true,
    });
  };

  forgottenPasswordForm = (e) => {
    e.preventDefault();
    const { emailForgPass } = this.state;
    firebase
      .auth()
      .sendPasswordResetEmail(emailForgPass)
      .then(function () {
        //email sent
      })
      .catch(function (error) {
        //an error happened
      });
    this.setState({
      emailForgPass: "",
      isPasswordForgotten: false,
      isResetEmailSend: true,
    });
  };

  render() {
    return (
      <>
        <div className="c-login-site">
          {this.state.error ? <p>{this.state.error.message}</p> : null}
          <form onSubmit={this.handleSubmit} className="c-login-form">
            <input
              type="text"
              name="email"
              placeholder="e-mail"
              onChange={this.handleChange}
              value={this.state.email}
              cols={40}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="hasło"
              onChange={this.handleChange}
              value={this.state.password}
              cols={40}
            />
            <br />
            <button className="btn login-btn">zaloguj</button>
          </form>
          <h4>
            <Link to={"/registrationSite"}>Nie masz konta? Załóż je!</Link>
          </h4>
          <button
            className="btn btn--remove"
            onClick={this.handleForgottenPassword}
          >
            nie pamiętasz hasła?
          </button>
          {this.state.isPasswordForgotten ? (
            <>
              <form
                className="c-login-form"
                onSubmit={this.forgottenPasswordForm}
              >
                <label htmlFor="email">
                  Podaj email, na który wyślemy wiadomość resetującą hasło.
                </label>
                <br />
                <input
                  type="text"
                  name="emailForgPass"
                  placeholder="e-mail"
                  onChange={this.handleChange}
                  value={this.state.emailForgPass}
                  cols={40}
                />
                <button className="btn login-btn">wyślij</button>
              </form>
            </>
          ) : null}
          {this.state.isResetEmailSend ? (
            <p>Wysłano wiadomość na podany email!</p>
          ) : null}
        </div>
      </>
    );
  }
}
