import React, { Component } from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Catalog } from './components/Catalog';
import { Calendar } from './components/Calendar';
import { Todolist } from './components/Todolist';
import { Wishlist } from './components/Wishlist';
import { AddForm } from './components/Add-form';
import { Help } from './components/Help';
import { Error } from './components/Error';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



export class App extends Component {

  state = {
    links: [
      {
        id: 0,
        url: 'http://google.pl',
        text: 'google',
        section: 'ogólne'
      },
    ]
  }

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
                <Route path="/Todolist" component={Todolist} />
                <Route patch="/WishList" component={Wishlist} />
                
                <Route path="/help" component={Help} />
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


