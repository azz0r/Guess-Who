import React, { PropTypes, Component } from 'react';
import './game-over.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as peopleActions from '../../actions/people-actions';

class GameOver extends Component {

  static propTypes = {
    people: PropTypes.array.isRequired
  }

  state = {
    people: []
  }

  render() {
    return (
      <div>
        <Collection people={this.props.people} />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    people: state.people
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(peopleActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);

function slugParse(string) {
  return string.toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '')  // remove leading, trailing -
}

const Collection = ({people}) => {
  return (
    <div className="row people-collection">
      {people.map((person) =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

const Person = ({person}) => {
  const slug = slugParse(person.name);
  return (
    <div className={`${slug} person col-xs-3 text-center`}>
      <p>
        <img
          src={`/images/${slug}.png`}
          title={person.name}
          alt={person.name}
        />
      </p>
      <h4>
        {person.name}
      </h4>
    </div>
  )
}
