import React from 'react';

export default class Introduction extends React.Component {

  displayName = 'Introduction'

  render() {
    return (
      <div id="introduction" className="row">
        <div className="col-lg-8">
          <p>I’ve worked on an extensive number of high traffic sites
          of varying purposes and have played many roles, ranging from
          <strong>Front End Development Lead, Technical Advisor, SEO Strategist,
          enior PHP Coder, Web Development Manager, Project Owner and
          Director of Technology.</strong></p>

          <p>I believe I’ve the unique ability to understand tasks from
          technical specifications all the way up to the stakeholders’
          feedback and requirements.</p>

          <p>Past projects include video on demand, content management,
          client facing content approval systems and daily deals sites.</p>

          <p>My technical skills include writing quality code across a
          variety of languages: <strong>OOP JavaScript, OOP PHP, HTML,
          CSS + LESS and SASS.</strong></p>
        </div>
        <div className="col-lg-4">
          I’ve a keen interest in developing large systems in <strong>BackboneJS</strong>, and
          API development. I’ve engineered many robust <strong>database structures</strong>,
          which feed to rigid API endpoints with strict methodologies in
          place. Please do visit my online portfolio for more information and code samples.
        </div>
      </div>
    )
  }
}
