import React from 'react';
import './App.scss';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer'


export const App = () => (
  <div className="App">
    <Header />
    <div><img src="https://via.placeholder.com/800x600" alt="placeholder"></img></div>
    <Footer />
  </div>
    
  );


