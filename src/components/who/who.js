import React, { PropTypes, Component } from 'react'
import * as PlayersActions from '../../actions/players'
import * as QuestionActions from '../../actions/questions'
import { connect } from 'react-redux'
import { toSlug, pickRandom } from './helpers'
const playerIds = {
  human: 0,
  bot: 1
}
class Who extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired,
  }

  state = {
    messages: []
  }

  componentDidMount() {
    this.gameTick = setInterval(
      this.shouldBotTakeTurn,
      1000
    )

    //TODO: Remove this preselection players lines
    let chosenPerson = this.props.players[playerIds.human].people.find((person) => person.name === "Stephanie McMahon"),
      chosenCPUPerson = this.props.players[playerIds.human].people.find((person) => person.name === "Rusev")
    this.onPersonClicked(chosenPerson, chosenCPUPerson)
  }

  componentWillUnmount() {
    clearInterval(this.gameTick)
  }

  shouldBotTakeTurn = () => {
    if (this.props.players[playerIds.bot].currentTurn) {
      this.onsBotTurn()
    }
  }

  //TODO: Remove personForCPU
  onPersonClicked = (chosenPerson, personForCPU=false) => {
    if (!this.props.players[playerIds.human].chosenPerson) {
      //TODO: Remove If statement
      if (!personForCPU) {
        let
          peopleForCPU = this.props.players[playerIds.human].people.filter((person) => person.id !== chosenPerson.id),
          personForCPU = pickRandom(peopleForCPU)
      }
      this.props.dispatch([
        PlayersActions.chosePerson(chosenPerson, playerIds.human),
        PlayersActions.chosePerson(personForCPU, playerIds.bot),
      ])
    }
  }

  getCurrentPlayerId = () => {
    return this.props.players[playerIds.human].currentTurn
      ? playerIds.human
      : playerIds.bot
  }

  getCurrentEnemyId = () => {
    return this.props.players[playerIds.human].currentTurn
      ? playerIds.bot
      : playerIds.human
  }

  onsBotTurn() {
    return;
    this.onQuestionChosen(
      this.getBotsQuestion()
    )
  }

  getBotsQuestion = () => {
    let botQuestions = this.props.questions[playerIds.bot];
    return pickRandom(botQuestions)
  }

  onQuestionChosenBot = () => {}

  onQuestionChosen = (question, event=false) => {
    if (event) {
      event.preventDefault()
    }
    let submitTurn = (playerId, question) => {
      if (this.props.players[playerId].currentTurn) {
        let enemyId = this.getCurrentEnemyId()
        this.props.dispatch([
          PlayersActions.turnConfirmed(question, playerId, enemyId),
          QuestionActions.questionUsed(question, playerId, enemyId),
        ])
      }
    }
    this.setState({
      messages: this.state.messages.concat(
        `${this.props.players[this.getCurrentPlayerId()].name}: "${question.question}"; ${String(this.doTheyHave(question))}`
      )
    })
    submitTurn(this.getCurrentPlayerId(), question)
  }

  doTheyHave = (question) => {
    let enemyPerson = this.props.players[this.getCurrentEnemyId()].chosenPerson;
    return Boolean(enemyPerson[question.key] && enemyPerson[question.key] === question.value)
  }

  render() {
    const shouldChooseAPerson = (playerId) => {
      return this.props.players[playerId].chosenPerson
        ? <PersonChosen person={this.props.players[playerId].chosenPerson} />
        : <ChooseAPerson person={this.props.players[playerId].chosenPerson} />
    }
    let winner = false;

    this.props.players.forEach((player, key) => {
      if (player.people.filter((person) => !person.chosen).length === 1) {
        winner = key
      }
    })
    return (
      <div className="row">
        <div className="col-xs-12 alert">
          {winner}
          <ul>
            {this.state.messages.map((message, key) => {
              return (
                <li key={key}>
                  {message}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="col-xs-12 human-board board">
          <div className="row">
            <div className="col-xs-12 col-md-4 col-sm-4 col-lg-4 text-center">
              <h3>Human Board</h3>
              {shouldChooseAPerson(playerIds.human)}
              <Questions
                active={this.props.players[playerIds.human].currentTurn && this.props.players[playerIds.human].chosenPerson}
                onQuestionChosen={this.onQuestionChosen}
                questions={this.props.questions[playerIds.human]}
              />
            </div>
            <div className="col-xs-12 col-md-8 col-sm-8 col-lg-8">
              <People
                people={this.props.players[playerIds.human].people}
                onPersonClicked={this.onPersonClicked}
              />
            </div>
          </div>
        </div>
        <div className="col-xs-6 bot-board board hide">
          <div className="row">
            <div className="col-xs-8">
              <People
                people={this.props.players[playerIds.bot].people}
                onPersonClicked={this.onPersonClicked}
              />
            </div>
            <div className="col-xs-4 text-center">
              <h3>CPU Board</h3>
              {shouldChooseAPerson(playerIds.bot)}
              <Questions
                active={this.props.players[playerIds.bot].currentTurn && this.props.players[playerIds.human].chosenPerson}
                onQuestionChosen={this.onQuestionChosenBot}
                questions={this.props.questions[playerIds.bot]}
              />
            </div>
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
  let questionClasses = question.used ? 'strike-through ' : '';
  questionClasses += toSlug(question.question)
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
      <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3"
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
      <h4>Choose your character</h4>
      <p>Click on the user you wish to choose as your character</p>
    </div>
  )
}

const Person = ({ person, showNameplate = true, onPersonClicked }) => {
  let slug = toSlug(person.name),
    chosenClass = person.chosen
      ? 'chosen'
      : ''
  const namePlate = ((name) =>
    <h4 className="hidden-xs hidden-sm">
      {name}
    </h4>
  )
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
      {namePlate(person.name)}
    </div>
  )
}
