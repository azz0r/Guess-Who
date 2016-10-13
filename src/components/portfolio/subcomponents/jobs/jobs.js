import React from 'react';
import Job from './job';
import JSON from '../../json/jobs.json';

export default class Jobs extends React.Component {

  displayName = 'Jobs'

  render() {
    const JSONData = JSON.reverse();
    return (
      <div id="jobs" className="row">
        <div className="col-lg-12">
          {JSONData.map((job, key) => {
            return (
              <Job
                key={key}
                model={job}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
