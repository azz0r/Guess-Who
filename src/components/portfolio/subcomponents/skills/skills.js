import React from 'react'
import Skill from './skill'
import JSON from '../../json/skills.json'

export default class Skills extends React.Component {

  displayName = 'Skills'

  render() {
    return (
      <div id="skills" className="row">
        <div className="col-lg-12">
          {JSON.map((skill, key) => {
            return (
              <Skill
                key={key}
                model={skill}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
