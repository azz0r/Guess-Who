import React from 'react'
import Venues from './venues'
import Search from './search'
import './foursquare.css'

export default class FourSquare extends React.Component {

  displayName = 'FourSquare'

  state = {
    venues: [],
    query: '',
  }

  onSearchUpdated = ( { venues, query } ) => {
    this.setState({
      venues,
      query,
    })
  }

  render() {
    return (
      <div className="foursquare">
        <div className="row foursquare__results">
          <h2 className="foursquare__header">
            Results ({this.state.venues.length})
          </h2>
          <Search onSearchUpdated={this.onSearchUpdated} />
          <Venues venues={this.state.venues} />
        </div>
      </div>
      )
    }
  }
