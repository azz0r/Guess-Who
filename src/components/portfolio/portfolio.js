import React from 'react'
import Introduction from './subcomponents/introduction'
import Skills from './subcomponents/skills/skills'
import Jobs from './subcomponents/jobs/jobs'
import Responsibilities from './subcomponents/responsibilities'

export default class Home extends React.Component {

  displayName = 'Home'

  render() {
    return (
      <section id="home" className="home">
        <br />
        <Introduction />
        <br />
        <div className="row">
          <div className="col-lg-8">
            <h3>
              Recent Experience
            </h3>
            <Jobs />
          </div>
          <div className="col-lg-4">
            <h3>Responsibilities</h3>
            <Responsibilities />
            <br />
            <h3>Skills</h3>
            <Skills />
          </div>
        </div>
      </section>
    )
  }
}
