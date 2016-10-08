import React from 'react'
import request from 'superagent'
import config from './config'
import _debounce from 'lodash.debounce'

export default class Search extends React.Component {

  displayName = 'Search'

  static propTypes = {
    onSearchUpdated: React.propTypes.func.isRequired
  }

  state = {
    venues: []
  }

  componentWillMount() {
    this.delayedCallback = _debounce((event) => {
      let query = event.target.value

      this.openRequest = request.get(`
        ${config.apiUrl}?query=${query}&client_id=${config.clientId}&client_secret=${config.clientSecret}&style=${config.style}&v=${config.v}&near=${config.near}`)
        .accept('json')
        .end((err, res) => {
          if(err) return
          let venues = res.body.response.groups[0].items
          this.props.onSearchUpdated({
            venues, query
          })
        })
    }, 500);
  }

  onSearch = (event) => {
    event.persist();
    this.delayedCallback(event);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 search">
          <input
            type="text"
            className="search__field"
            onKeyUp={this.onSearch}
            onKeyPress={this.onSearch}
          />
          <button
            type="Submit"
            className="search__button"
            onClick={this.onSearch}
            onKeyPress={this.onSearch}>
          Search
          </button>
        </div>
      </div>
    )
  }

}
