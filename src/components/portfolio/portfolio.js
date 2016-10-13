import React from 'react'
import Introduction from './subcomponents/introduction'
import Skills from './subcomponents/skills/skills'
import Jobs from './subcomponents/jobs/jobs'
import NotableExperience from './subcomponents/notable-experience'
import Responsibilities from './subcomponents/responsibilities'
import { Sticky } from 'react-sticky';

export default class Home extends React.Component {

  displayName = 'Home'

  render() {
    return (
      <section id="home" className="home">
        <h1>Aaron Lote</h1>
        <div className="row">
          <div className="col-lg-8">
            <Introduction />
            <hr />
            <NotableExperience />
            <hr />
            <h3>
              Recent Experience
            </h3>
            <Jobs />
          </div>
          <div className="col-lg-4 sidebar">
            <Sticky>
              <h3>Responsibilities</h3>
              <Responsibilities />
              <br />
              <h3>Skills</h3>
              <Skills />
            </Sticky>
          </div>
        </div>
      </section>
    )
  }
}
