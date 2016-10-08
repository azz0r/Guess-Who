import React from 'react'
import Venue from './venue'

export default class Venues extends React.Component {

  displayName = 'Venues'

  static propTypes = {
    venues: React.propTypes.array.isRequired
  }



  render() {
    console.log('venues render', this.props)
    return (
      <div className="col-xs-12">
        {this.props.venues.map((venue) => {
          return (
            <Venue {...venue.venue} />
          )
        })}
      </div>
    )
  }

}
