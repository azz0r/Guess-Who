import React, { PropTypes, Component } from 'react';
import './game-over.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as peopleActions from '../../actions/people-actions';
import FilterStrings from './filters.json';

class GameOver extends Component {

  static propTypes = {
    people: PropTypes.array.isRequired
  }

  componentWillMount() {
    this.fields = this.getFields();
    let choices = this.getChoices();
    // remove dead
    delete choices[0];
    this.setState({
      fields: this.fields,
      choices,
      questions: this.getQuestions(choices)
    })
  }

  getChoices() {
    let fieldsLength = Object.keys(this.props.people[0]).length,
    filtersGroupedByAnswer = [fieldsLength];
    // loop the fields and add values to the collection returned
    this.fields.forEach((field) => {
      filtersGroupedByAnswer[field] = this.getValues(field);
    });
    return filtersGroupedByAnswer;
  }

  getFields = () => {
    let fields = [];
    for (const key of Object.keys(this.props.people[0])) {
      fields.push(key);
    }
    return fields;
  }

  getValues = (field) => {
    return this.props.people.map((object) => {
      return object[field];
    })
  }

  getQuestions = (choices) => {
    console.log(choices);
    let newChoices = [];
    this.fields.forEach((filterName, key) => {
      console.log(this.state);
      newChoices[key] = this.deduplicate(choices[key])
    })
    console.log('newChoices', newChoices);
  }

  deduplicate = (data) => {
    console.log('data', data);
    if (data && data.length > 0) {
      var result = [];

      data.forEach(function (elem) {
        if (result.indexOf(elem) === -1) {
          result.push(elem);
        }
      });

      return result;
    }
  }


  render() {
    console.log(this.state);
    return (
      <div>
        <Collection people={this.props.people} />
        <Choices people={this.props.people} />
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

const Choices = ({people}) => {
  console.log()
  return (
    <div className="row choices">
    </div>
  )
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
