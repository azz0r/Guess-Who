import React, { Component } from 'react';
import './app.css';
import PeopleContainer from '../who/who';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header clearfix">
          <nav>
            <ul className="nav nav-pills pull-right">
              <li role="presentation"><a href="/">Reset Game</a></li>
              <li role="presentation"><a href="#">Github</a></li>
            </ul>
          </nav>
          <h3 className="text-muted">Guess Who</h3>
        </div>

        <PeopleContainer />
      </div>
    );
  }
}

export default App;
