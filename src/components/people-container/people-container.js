import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as peopleActions from '../../actions/people-actions';
import PeopleList from './list';

class PeopleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: []
    };
  }

  render() {
    const {people} = this.props;

    return (
      <div>
        <PeopleList people={people} />
      </div>
    );
  }
}

PeopleContainer.propTypes = {
  people: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

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

export default connect(mapStateToProps, mapDispatchToProps)(PeopleContainer);
