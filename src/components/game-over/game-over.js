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
    );
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

const Collection = ({people}) => {
  return (
    <div>
      {people.map((person) =>
        <Person key={person.name} person={person} />
      )}
    </div>
  );
};

const Person = ({person}) => {
  return (
    <div>
      {person.name}
    </div>
  );
};
