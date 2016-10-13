import React, { Component } from 'react'
import './app.css'
import Portfolio from '../portfolio/portfolio'
import { StickyContainer } from 'react-sticky';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <StickyContainer>
          <Portfolio />
        </StickyContainer>
      </div>
    )
  }
}
