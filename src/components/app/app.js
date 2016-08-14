import React, { Component } from 'react';
import './app.css';
import PeopleContainer from '../people-container/people-container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          Guess Who!
        </div>
        <PeopleContainer />
      </div>
    );
  }
}

export default App;
