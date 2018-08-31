import React, { Component } from 'react';
import './reset.css'
import './App.css';
import Routes from './nav/routes'
import {HashRouter} from 'react-router-dom'
import Nav from './nav/nav'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Nav/>
          <Routes/>
        </div>
      </HashRouter>
    );
  }
}

export default App;
