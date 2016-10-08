import React from 'react'

export default class Venue extends React.Component {

  displayName = 'Venue'

  static propTypes = {
    name: React.propTypes.string.isRequired,
    checkinsCount:  React.propTypes.number.isRequired,
    rating:  React.propTypes.number,
    img:  React.propTypes.string,
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 venue">
          <span className="venue__name">
            {this.props.name}
            <If condition={this.props.checkinsCount}>
              <span className="badge venue__checkins">
                {this.props.checkinsCount} checkins
              </span>
            </If>
            &nbsp;
            <If condition={this.props.rating}>
              <span className="badge venue__rating">
                {this.props.rating} / 10
              </span>
            </If>
          </span>
        </div>
      </div>
    )
  }

}
