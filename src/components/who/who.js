import React, { PropTypes, Component } from 'react';
import './who.css';
import * as PeopleActions from '../../actions/people';
import * as PlayerActions from '../../actions/players';
import * as QuestionActions from '../../actions/questions';
import { connect } from 'react-redux';
import { slugParse } from './helpers';

class Who extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    people: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired
  }

  componentWillMount() {
    this.setState({
      currentPlayer: this.props.players[0]
    })
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
          <ChosenPerson person={this.state.currentPlayer.chosenPerson} />
          <Questions
            active={this.props.players[0].currentTurn && this.state.currentPlayer.chosenPerson}
            onQuestionChosen={this.onQuestionChosen}
            questions={this.props.questions}
          />
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  people: state.people,
  players: state.players,
  questions: state.questions
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
      className="list-group-item">
      <a
        href="#"
        onKeyPress={onQuestionChosen.bind(this, values)}
        onClick={onQuestionChosen.bind(this, values)}>
        {values.question}{append}?
      </a>
    </li>
  )
}

const People = (({ people }) =>
  <div className="row people-collection">
    {people.map((person, key) =>
      <Person
        key={key}
        person={person}
      />
    )}
  </div>
)

const ChosenPerson = ({ person }) => {
  return (
    <div>
      <h2>Your character</h2>
    </div>
  );
}

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
