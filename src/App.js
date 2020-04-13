import React, { Component } from "react";
import "./App.scss";
import { firebase } from "./firebase";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Catalog } from "./components/Catalog";

import { Todolist } from "./components/Todolist";
import { Wishlist } from "./components/Wishlist";
import { AddForm } from "./components/AddForm";
import { Help } from "./components/Help";
import { LoginSite } from "./components/LoginSite";
import { RegistrationSite } from "./components/RegistrationSite";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PlantView } from "./components/PlantView";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header user={this.state.user} />

          <div className="o-container">
            <div className="c-site-content">
              <Switch>
                {this.state.user === undefined ? (
                  <p>Loading...</p>
                ) : this.state.user ? (
                  <>
                    <Route path="/" exact component={Catalog} />
                    <Route path="/add-form" component={AddForm} />

                    <Route path="/todolist" component={Todolist} />
                    <Route path="/wishlist" component={Wishlist} />

                    <Route path="/plants/:plantId" component={PlantView} />
                    <Route path="/help" component={Help} />
                  </>
                ) : (
                  <>
                    <Route path="/" component={LoginSite} />
                    <Route
                      path="/registrationSite"
                      exact
                      component={RegistrationSite}
                    />
                    <Route path="/help" component={Help} />
                  </>
                )}
              </Switch>
            </div>
          </div>

          <Footer user={this.state.user} />
        </div>
      </Router>
    );
  }
}
