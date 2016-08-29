import React, { PropTypes, Component } from 'react'
import './who.css'
import * as PeopleActions from '../../actions/people'
import * as PlayerActions from '../../actions/players'
import * as QuestionActions from '../../actions/questions'
import { connect } from 'react-redux'
import { slugParse } from './helpers'
const playerIds = {
  human: 0,
  bot: 1
}

class Who extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    people: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired,
  }

  componentWillReceiveProps() {
    console.log(this.props.players[playerIds.bot].currentTurn, 'componentWillReceiveProps');
    if (this.props.players[playerIds.bot].currentTurn) {
      this.onsBotTurn()
    }
  }

  onPersonClicked = (chosenPerson) => {
    if (!this.props.players[playerIds.human].chosenPerson) {
      let
        peopleForCPU = this.props.people[playerIds.human].filter((person) => person.id !== chosenPerson.id),
        personForCPU = peopleForCPU[(Math.random() * peopleForCPU.length) | 0]

      this.props.dispatch([
        PlayerActions.chosePerson(chosenPerson, playerIds.human),
        PlayerActions.chosePerson(personForCPU, playerIds.bot),
      ])
    }
  }

  getCurrentPlayerId = () => {
    return this.props.players[playerIds.human].currentTurn
      ? playerIds.human
      : playerIds.bot
  }

  onsBotTurn() {
    this.onQuestionChosen(
      this.getBotsQuestion(),
      false
    )
  }

  getBotsQuestion = () => {
    let botQuestions = this.props.questions[playerIds.bot];
    return botQuestions[(Math.random() * botQuestions.length) | 0]
  }

  onQuestionChosen = (question, event) => {
    // eslint-disable-next-line
    if (event) {
      event.preventDefault()
    }
    let submitTurn = (playerId, question) => {
      if (this.props.players[playerId].currentTurn) {
        this.props.dispatch([
          PeopleActions.turnConfirmed(question, playerId),
          QuestionActions.questionUsed(question, playerId),
          PlayerActions.turnConfirmed(playerId),
        ])
      }
    }
    submitTurn(this.getCurrentPlayerId(), question)
  }

  render() {
    const shouldChooseAPerson = (playerId) => {
      return this.props.players[playerId].chosenPerson
        ? <PersonChosen person={this.props.players[playerId].chosenPerson} />
        : <ChooseAPerson person={this.props.players[playerId].chosenPerson} />
    }
    return (
      <div>
        <div className="row">
          <div className="col-xs-12  col-md-4 col-sm-4 col-lg-4 text-center">
            {shouldChooseAPerson(playerIds.human)}
            <Questions
              active={this.props.players[playerIds.human].currentTurn && this.props.players[playerIds.human].chosenPerson}
              onQuestionChosen={this.onQuestionChosen}
              questions={this.props.questions[playerIds.human]}
            />
          </div>
          <div className="col-xs-12 col-md-8 col-sm-8 col-lg-8">
            <People
              people={this.props.people[playerIds.human]}
              onPersonClicked={this.onPersonClicked}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-8">
            <h2>CPU Board</h2>
          </div>
          <div className="col-xs-8">
            <People
              people={this.props.people[playerIds.bot]}
              onPersonClicked={this.onPersonClicked}
            />
          </div>
          <div className="col-xs-4 text-center">
            {shouldChooseAPerson(playerIds.bot)}
          </div>
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
    <div className={`row questions ${(activeClass)}`}>
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
  let questionClasses = question.used ? 'strike-through' : '';
  return (
    <li className="list-group-item">
      <a href="#"
        className={questionClasses}
        onKeyPress={onQuestionChosen.bind(this, question)}
        onClick={onQuestionChosen.bind(this, question)}>
        {question.question}
      </a>
    </li>
  )
}

const People = (({ people, onPersonClicked }) =>
  <div className="row people-collection">
    {people.map((person, key) =>
      <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2"
        key={key}>
        <Person
          person={person}
          onPersonClicked={onPersonClicked}
        />
      </div>
    )}
  </div>
)

const PersonChosen = ({ person }) => {
  return (
    <div className="row person-chosen">
      <div className="col-xs-12">
        <Person showNameplate={false} person={person} />
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

const NamePlate = (({ name }) =>
  <h4 className="hidden-xs hidden-sm">
    {name}
  </h4>
)

const Person = ({ person, showNameplate = true, onPersonClicked }) => {
  let slug = slugParse(person.name),
    chosenClass = person.chosen
      ? 'chosen'
      : '',
    nameplate = showNameplate
      ? <NamePlate name={person.name} />
      : ''
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
      {nameplate}
    </div>
  )
}
