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
        <ul className="list-group venues__list">
          {this.props.venues.map((venue) => {
            return (
              <li className="list-group-item venues__venue">
                <Venue {...venue.venue} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

}
