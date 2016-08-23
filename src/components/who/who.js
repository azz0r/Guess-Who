import React, { PropTypes, Component } from 'react';
import './who.css';
import * as PeopleActions from '../../actions/people';
import * as PlayerActions from '../../actions/players';
import FilterStrings from './filters.json';
import { connect } from 'react-redux';
import { slugParse, pickRandomItems, getValues, getFields, condenseArray } from './helpers';

class Who extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    people: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired
  }

  componentWillMount() {
    this.fields = getFields(this.props.people[0]);
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
      filtersGroupedByAnswer[field] = getValues(this.props.people, field);
    });
    delete filtersGroupedByAnswer[0];
    return filtersGroupedByAnswer;
  }

  /*
    * Take the fields and see how many filters we have available for them
    * @return {array} of choices for the user
  */
  getQuestions = () => {
    let
      questions = [],
      deduplicatedQuestions = [];

    this.fields.forEach((filterName, key) => {
      if (filterName === 'name' || filterName === 'id') {
        return;
      }
      deduplicatedQuestions = condenseArray(this.choices[filterName])

      if (deduplicatedQuestions.length > 0) {
        deduplicatedQuestions.forEach((question, key) => {
          questions.push({
            question: FilterStrings[filterName].question,
            field: filterName,
            value: question
          });
        })
      }
    })
    return pickRandomItems(questions, 5);
  }

  onQuestionChosen = (question) => {
    if (this.props.players[0].currentTurn) {
      this.props.dispatch([
        PeopleActions.turnConfirmed(question),
        PlayerActions.turnConfirmed(true)
      ])
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-8">
          <People people={this.props.people} />
        </div>
        <div className="col-xs-4">
          <Questions
            active={this.props.players[0].currentTurn}
            onQuestionChosen={this.onQuestionChosen}
            questions={this.state.questions}
          />
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  people: state.people,
  players: state.players
}))(Who)

const Questions = (({ active, questions, onQuestionChosen }) => {
  let activeClass = active ? 'active' : '';
  return (
    <div className={`row questions ${activeClass}`}>
      <div className="col-xs-16">
        <ul className="list-group">
          {questions.map((question, key) =>
            <Question
              key={key}
              onQuestionChosen={onQuestionChosen}
              values={question}
            />
          )}
        </ul>
      </div>
    </div>
  );
})

const Question = ({ values, onQuestionChosen }) => {
  let append = (typeof(values.value) !== 'boolean')
    ? ` ${values.value}`
    : '';
  return (
    <li
      className="list-group-item"
      onClick={onQuestionChosen.bind(this, values)}>
      {values.question}{append}?
    </li>
  )
}

const People = (({people}) =>
  <div className="row people-collection">
    {people.map((person, key) =>
      <Person
        key={key}
        person={person}
      />
    )}
  </div>
)

const Person = ({ person }) => {
  let slug = slugParse(person.name),
    chosenClass = person.chosen ? 'chosen' : '';
  return (
    <div className={`${slug} ${chosenClass} person col-xs-3 text-center`}>
      <p>
        <img
          src={`/static/imgs/${slug}.png`}
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
