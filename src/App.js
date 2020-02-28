import React, { Component } from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Catalog } from './components/Catalog';
import { Calendar } from './components/Calendar';
import { Todolist } from './components/Todolist';
import { Wishlist } from './components/Wishlist';
import { AddForm } from './components/Add-form';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';



export class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Header />
          <hr />
          <section className="c-section">
            <Route path="/" exact component={Catalog} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/Todolist" component={Todolist} />
            <Route path="/Wishlist" component={Wishlist} />
            <Route path="/add-form" component={AddForm} />
          </section>
          <hr />
          <Footer />
        </div>
      </Router>
    );
  }
}


