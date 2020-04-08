import React, { Component } from "react";
import { firebase, auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export class LoginSite extends Component {
  state = {
    email: "",
    password: "",
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

  render() {
    return (
      <div className="c-login-site">
       
        {this.state.error ? (
          <p> {this.state.error.message} </p>
        ) : (
          <h3> Zaloguj się: </h3>
        )}
        
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
          <button className="btn login-btn"> zaloguj </button>
          
        </form>
        <h4>
          <Link to={"/registrationSite"}> Nie masz konta ? Załóż je! </Link>
        </h4>
      </div>
    );
  }
}
