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
    query: '',
    venues: [],
  }

  componentWillMount() {
    this.delayedCallback = _debounce((event) => {
      let query = event.target.value

      this.openRequest = request.get(`
        ${config.apiUrl}?query=${query}&client_id=${config.clientId}&client_secret=${config.clientSecret}&style=${config.style}&v=${config.v}&near=${config.near}&venuePhotos=1`)
        .accept('json')
        .end((err, res) => {
          if(err) return
          let venues = res.body.response.groups[0].items
          this.props.onSearchUpdated({
            venues, query
          })
        })
    }, 500)
  }

  onSearch = (event) => {
    event.persist()
    this.delayedCallback(event)
  }

  componentWillUnmount() {
    this.openRequest.abort()
  }

  render() {
    return (
      <div className="row search">
        <div className="col-xs-12">
          <div className="form-group has-feedback">
            <input
              className="form-control search__field"
              placeholder="Search"
              name="search__field"
              id="search__field"
              type="text"
              onKeyUp={this.onSearch}
              onKeyPress={this.onSearch}
            />
            <i className="glyphicon glyphicon-search form-control-feedback"></i>
          </div>
        </div>
      </div>
    )
  }

}
