import React from 'react';

export default class HomeSkill extends React.Component {

  displayName = 'HomeSkill'

  render() {
    return (
      <div className="row">
        <p className="col-lg-7">
          {this.props.model.title}
        </p>
        <p className="col-lg-5 text-right">
          {this.props.model.length}
        </p>
      </div>
    )
  }
}
