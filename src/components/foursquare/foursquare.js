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
      <div>
        <div className="row">
          <h2>
            Results ({this.state.venues.length})
          </h2>
          <Search onSearchUpdated={this.onSearchUpdated} />
          <div className="col-xs-12">
            <Venues venues={this.state.venues} />
          </div>
        </div>
      </div>
      )
    }
  }
