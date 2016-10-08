import React from 'react'
import Venue from './venue'

export default class Venues extends React.Component {

  displayName = 'Venues'

  static propTypes = {
    venues: React.propTypes.array.isRequired
  }



  render() {
    return (
      <div className="col-xs-12 venues">
        {this.props.venues.map((venue) => {
          return (
            <div className="venues__venue">
              <Venue {...venue.venue} />
            </div>
          )
        })}
      </div>
    )
  }

}
