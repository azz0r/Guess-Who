import React, { PropTypes, Component } from 'react'
import './who.css'
import * as PeopleActions from '../../actions/people'
import * as PlayerActions from '../../actions/players'
import * as QuestionActions from '../../actions/questions'
import { connect } from 'react-redux'
import { slugParse } from './helpers'

class Who extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    people: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired,
  }

  onPersonClicked = (chosenPerson) => {
    if (!this.props.players[0].chosenPerson) {
      let
        choicesForCPU = this.props.people.filter((person) => person.id !== chosenPerson.id),
        personForCPU = choicesForCPU[(Math.random() * choicesForCPU.length) | 0]
      this.props.dispatch([
        PlayerActions.chosePerson(chosenPerson, 0),
        PlayerActions.chosePerson(personForCPU, 1),
      ])
    }
  }

  onQuestionChosen = (question, value) => {
    if (this.props.players[0].currentTurn) {
      this.props.dispatch([
        PeopleActions.turnConfirmed(question, value),
        QuestionActions.turnConfirmed(question, value),
        PlayerActions.turnConfirmed(true),
      ])
    }
  }

  render() {
    let shouldChooseAPerson = this.props.players[0].chosenPerson
      ? <PersonChosen person={this.props.players[0].chosenPerson} />
      : <ChooseAPerson person={this.props.players[0].chosenPerson} />
    return (
      <div className="row">
        <div className="col-xs-8">
          <People
            people={this.props.people}
            onPersonClicked={this.onPersonClicked}
          />
        </div>
        <div className="col-xs-4">
          {shouldChooseAPerson}
          <Questions
            active={this.props.players[0].currentTurn && this.props.players[0].chosenPerson}
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
  questions: state.questions,
}))(Who)

const Questions = (({ active, questions, onQuestionChosen }) => {
  let activeClass = active ? 'active' : ''
  return (
    <div className={`row questions ${activeClass} text-center`}>
      <div className="col-xs-16">
        <ul className="list-group">
          {questions.map((question, key) =>
            <Question
              key={key}
              onQuestionChosen={onQuestionChosen}
              question={question}
            />
          )}
        </ul>
      </div>
    </div>
  )
})

const Question = ({ question, onQuestionChosen }) => {
  let questionValue = question.values[(Math.random() * question.values.length) | 0]
  let append = question.appendValue && ` ${questionValue}`
  return (
    <li className="list-group-item">
      <a href="#"
        onKeyPress={onQuestionChosen.bind(this, question, questionValue)}
        onClick={onQuestionChosen.bind(this, question, questionValue)}>
        {question.question}{append}?
      </a>
    </li>
  )
}

const People = (({ people, onPersonClicked }) =>
  <div className="row people-collection">
    {people.map((person, key) =>
      <div className="col-xs-3" key={key}>
        <Person
          person={person}
          onPersonClicked={onPersonClicked}
        />
      </div>
    )}
  </div>
)

const PersonChosen =  ({ person }) => {
  return (
    <div className="row">
      <h2>Your character</h2>
      <div className="col-xs-12">
        <Person person={person} />
      </div>
    </div>
  )
}

const ChooseAPerson = () => {
  return (
    <div>
      <h2>Choose your character</h2>
      <p>Click on the user you wish to choose as your character</p>
    </div>
  )
}

const Person = ({ person, onPersonClicked }) => {
  let slug = slugParse(person.name),
    chosenClass = person.chosen ? 'chosen' : ''
  return (
    <div className={`${slug} ${chosenClass} person text-center`}>
      <p>
        <img
          src={`/static/imgs/${slug}.png`}
          title={person.name}
          alt={person.name}
          onClick={onPersonClicked ? onPersonClicked.bind(this, person) : null}
        />
      </p>
      <h4>
        {person.name}
      </h4>
    </div>
  )
}
