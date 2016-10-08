import React from 'react'
import request from 'superagent'
import config from './config'
import _debounce from 'lodash.debounce'
import './foursquare.css'

export default class FourSquare extends React.Component {

  displayName = 'FourSquare'

  state = {
    venues: []
  }

  componentWillMount() {
    console.log('componentWillMount')

    this.delayedCallback = _debounce((event) => {
      console.log('debounce')
      let query = event.target.value

      this.openRequest = request.get(`
        ${config.apiUrl}?query=${query}&client_id=${config.clientId}&client_secret=${config.clientSecret}&style=${config.style}&v=${config.v}&near=${config.near}`)
        .accept('json')
        .end((err, res) => {
          if(err) return
          let venues = res.body.response.groups[0].items
          this.setState({
            venues
          })
        })
    }, 1000);
  }

  onSearch = (event) => {
    event.persist();
    this.delayedCallback(event);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 square-search">
            <input
            type="text"
            className="square-search__field"
            onKeyUp={this.onSearch}
            onKeyPress={this.onSearch}
            />
            <button
            type="Submit"
            className="square-search__button"
            onClick={this.onSearch}
            onKeyPress={this.onSearch}>
            Search
            </button>
          </div>
        </div>
        <div className="row">
          <h2>
            Results ({this.state.venues.length})
          </h2>
          <div className="col-xs-12">
            {this.state.venues.map((venue) => {
              return (
                <div className="row">
                  <div className="col-xs-12">
                    {venue.venue.name}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      )
    }
  }
