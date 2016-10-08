import React from 'react'

export default class Venue extends React.Component {

  displayName = 'Venue'

  static propTypes = {
    name: React.propTypes.string.isRequired
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 venue">
          <span className="venue__name">
            {this.props.name}
          </span>
        </div>
      </div>
    )
  }

}
