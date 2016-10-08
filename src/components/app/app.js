import React, { Component } from 'react'
import './app.css'
import FourSquare from '../foursquare/foursquare'

class App extends Component {
  render() {
    return (
      <div className="container">
        <header className="header">
          <h1>FourSquare Search</h1>
        </header>
        <FourSquare />
      </div>
    )
  }
}

export default App
