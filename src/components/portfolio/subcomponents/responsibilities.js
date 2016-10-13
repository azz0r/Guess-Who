import React from 'react';

export default class Responsibilities extends React.Component {

  displayName = 'Responsibilities'

  render() {
    const responsibilities = [
      'Technical Advisor',
      'SEO Strategist',
      'PHP Developer',
      'Web Development Manager',
      'Scrum Master',
      'Director of Technology',
      'IT Support',
      'Team Management',
      'Project Specifications & Budget',
      'Strategy & Planning',
      'Risk Assessment',
      'Infrastructure Development',
    ]
    return (
      <div id="jobs" className="row">
        <div className="col-lg-12">
          {responsibilities.map ((responsibility, key) => {
            return (
              <p
                key={key}
                className="strong">
                {responsibility}
              </p>
            )
          })}
        </div>
      </div>
    )
  }
}
