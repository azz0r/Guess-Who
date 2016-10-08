import React from 'react'

export default class Venue extends React.Component {

  displayName = 'Venue'

  static propTypes = {
    name: React.propTypes.string.isRequired
  }

  render() {
    console.log('venue render', this.props)
    return (
      <div className="row">
        <div className="col-xs-12">
          {this.props.name}
        </div>
      </div>
    )
  }

}
