import React from 'react';

export default class Introduction extends React.Component {

  displayName = 'Introduction'

  render() {
    return (
      <div id="introduction" className="row">
        <div className="col-lg-12">
          <p>
            I am a London based senior web developer with
            10 years commercial
            experience working with large, and small,
            companies to deliver high quality web experiences to millions of customers. 
          </p>
          <p>
            With my varied experience I have a valuable ability to understand
            a task from the perspective of developers, project manager
            and stake holders.
          </p>
          <p>
            I’m experienced with implementing standards and processes to improve workflows and productivity.
          </p>
        </div>
      </div>
    )
  }
}
