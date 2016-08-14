import React, { Component } from 'react';
import './app.css';
import PeopleContainer from '../game-over/game-over';

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
