import React, { Component } from "react";
import "./App.scss";
import { firebase } from "./firebase";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Catalog } from "./components/Catalog";
import { Calendar } from "./components/Calendar";
import { Todolist } from "./components/Todolist";
import { Wishlist } from "./components/Wishlist";
import { AddForm } from "./components/AddForm";
import { Help } from "./components/Help";
import { LoginSite } from "./components/LoginSite";
import { RegistrationSite } from "./components/RegistrationSite";
import { Error } from "./components/Error";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PlantView } from "./components/PlantView";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <div className="o-container">
            <div className="c-site-content">
              <Switch>
                <Route
                  path="/registrationSite"
                  exact
                  component={RegistrationSite}
                />
                {this.state.user ? (
                  <>
                    <Route path="/" exact component={Catalog} />
                    <Route path="/add-form" component={AddForm} />
                    <Route path="/calendar" component={Calendar} />
                    <Route path="/todolist" component={Todolist} />
                    <Route path="/wishlist" component={Wishlist} />
                    <Route path="/help" component={Help} />
                    <Route path="/plants/:plantId" component={PlantView} />
                  </>
                ) : (
                  <Route path="/" exact component={LoginSite} />
                )}
                {/* <Route component={Error} /> */}
              </Switch>
            </div>
          </div>
          <hr />
          <Footer user={this.state.user} />
        </div>
      </Router>
    );
  }
}
