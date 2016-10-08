import React from 'react'
import Venue from './venue'

export default class Venues extends React.Component {

  displayName = 'Venues'

  static propTypes = {
    venues: React.propTypes.array.isRequired,
  }

  render() {
    return (
      <div className="col-xs-12 venues">
        <ul className="list-group venues__list">
          {this.props.venues.map((venue) => {
            venue = venue.venue // 4² convenience
            let newVenue = {
              name: venue.name,
              img: venue.photos && venue.photos.groups[0]
                ? venue.photos.groups[0].items[0].prefix.suffix
                : '',
              rating: venue.rating,
              checkinsCount: venue.stats ? venue.stats.checkinsCount : false
            }
            return (
              <li className="list-group-item venues__venue">
                <Venue {...newVenue} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

}
