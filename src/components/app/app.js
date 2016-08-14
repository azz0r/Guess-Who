import React, { Component } from 'react';
import './app.css';
import PeopleContainer from '../PeopleContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          Guess Who!
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <PeopleContainer />
      </div>
    );
  }
}

export default App;
