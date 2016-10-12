import React, { Component } from 'react';
import './app.css';
import Who from '../who/who';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Who />
      </div>
    );
  }
}

export default App;
