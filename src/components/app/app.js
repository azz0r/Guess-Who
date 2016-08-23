import React, { Component } from 'react';
import './app.css';
import PeopleContainer from '../who/who';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="header clearfix">
          <h3>Guess Who</h3>
        </div>
        <PeopleContainer />
      </div>
    );
  }
}

export default App;
