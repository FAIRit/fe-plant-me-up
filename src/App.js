import React, { Component } from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Catalog } from './components/Catalog';
import { Calendar } from './components/Calendar';
import { Todolist } from './components/Todolist';
import { Wishlist } from './components/Wishlist';
import { AddForm } from './components/AddForm';
import { Help } from './components/Help';
import { Error } from './components/Error';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Search } from './components/Search';
import { PlantView } from './components/PlantView';

export class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <hr />
          <div className="o-container">
            <div className="c-site-content">
              <Switch>
                <Route path="/add-form" component={AddForm} />
                <Route path="/" exact component={Catalog} />
                <Route path="/calendar" component={Calendar} />
                <Route path="/todolist" component={Todolist} />
                <Route path="/wishlist" component={Wishlist} />
                <Route path="/help" component={Help} />
                <Route path="/plants/:plantId" component={PlantView} />
                <Route path="/search" component={Search} />
                <Route component={Error} />
              </Switch>
            </div>
          </div>
          <hr />
          <Footer />
        </div>
      </Router>
    );
  }
}


