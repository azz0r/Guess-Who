import React, { PropTypes, Component } from 'react';
import './game-over.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as peopleActions from '../../actions/people-actions';
// import FilterStrings from './filters.json';

class GameOver extends Component {

  static propTypes = {
    people: PropTypes.array.isRequired
  }

  componentWillMount() {
    this.fields = this.getFields();
    this.choices = this.getChoices();
    this.setState({
      fields: this.fields,
      choices: this.choices,
      questions: this.getQuestions()
    })
  }

  /*
    * Get Available filters with grouped answers
    * @return {array} returns an array of fields with an array of answers inside
  */
  getChoices() {
    let fieldsLength = Object.keys(this.props.people[0]).length,
    filtersGroupedByAnswer = [fieldsLength];
    // loop the fields and add values to the collection returned
    this.fields.forEach((field) => {
      filtersGroupedByAnswer[field] = this.getValues(field);
    });
    delete filtersGroupedByAnswer[0];
    return filtersGroupedByAnswer;
  }

  /*
    * Takes an object and generates a new array of the fields on that object
    * @return {array} returns an array of fields
  */
  getFields = () => {
    let fields = [];
    for (const key of Object.keys(this.props.people[0])) {
      fields.push(key);
    }
    return fields;
  }

  /*
    * Get an array of values from the peoples collection
    * @param  {string} field on the object we want to aggregate
    * @return {array} returns an array of fields
  */
  getValues = (field) => {
    return this.props.people.map((object) => {
      return object[field];
    })
  }

  /*
    * Take the fields and see how many filters we have available for them
    * @return {array} of choices for the user
  */
  getQuestions = () => {
    let questions = [];
    this.fields.forEach((filterName, key) => {
      questions[filterName] = this.deduplicate(this.choices[filterName])
    })
    return questions;
  }

  deduplicate = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.forEach(function (elem) {
        if (result.indexOf(elem) === -1) {
          result.push(elem);
        }
      });
    }
    return result;
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
