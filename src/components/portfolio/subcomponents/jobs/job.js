import React from 'react'

export default class Job extends React.Component {

  displayName = 'Job'

  render() {
    return (
      <div className="row job">
        <div className="col-lg-12">
          <h4>
            <span className="strong">
              <a href={this.props.model.url} target="_blank">
                {this.props.model.alias}
              </a>
            </span> · {this.props.model.role}
          </h4>
          <p className="strong">{this.props.model.responsibilities}</p>
          <p>{this.props.model.location} · {this.props.model.from} to {this.props.model.to}</p>
          <p className="description" dangerouslySetInnerHTML={ {__html: this.props.model.description} }></p>
        </div>
      </div>
    )
  }
}
