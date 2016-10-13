import React, { Component } from 'react'
import './app.css'
import Portfolio from '../portfolio/portfolio'

export default class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Portfolio />
      </div>
    )
  }
}
