import React, { PropTypes, Component } from 'react'
import { composeResetReducer } from 'redux-reset-store'
import arrayShuffle from 'array-shuffle'
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

  componentDidMount() {
    this.gameTick = setInterval(
      this.shouldBotTakeTurn,
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.gameTick)
  }

  shouldBotTakeTurn = () => {
    if (this.props.players[playerIds.bot].currentTurn) {
      this.onsBotTurn()
    }
  }

  onResetGame = () => {
    this.props.dispatch({
      type: 'RESET'
    })
  }

  onPersonClicked = (chosenPerson) => {
    if (!this.props.players[playerIds.human].chosenPerson) {
      let
        peopleForCPU = this.props.players[playerIds.human].people.filter((person) => person.id !== chosenPerson.id),
        personForCPU = pickRandom(peopleForCPU)

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
    submitTurn(this.getCurrentPlayerId(), question)
  }

  doTheyHave = (question) => {
    let enemyPerson = this.props.players[this.getCurrentEnemyId()].chosenPerson;
    return Boolean(enemyPerson[question.key] && enemyPerson[question.key] === question.value)
  }

  _getWinner() {
    let weHaveAWinner = false,
      winnerId = false;
    this.props.players.forEach((player, key) => {
      if (player.people.filter((person) => !person.chosen).length === 1) {
        weHaveAWinner = true
        winnerId = key
      }
    })
    return {
      weHaveAWinner,
      winnerId
    }
  }

  _getUsedQuestions() {
    return {
      botQuestionsUsed: this.props.questions[1].filter((question) => question.used),
      humanQuestionsUsed: this.props.questions[0].filter((question) => question.used),
    }
  }

  render() {
    let
      { weHaveAWinner, winnerId } = this._getWinner(),
      { botQuestionsUsed, humanQuestionsUsed } = this._getUsedQuestions();
    return (
      <div className="row">
        <If condition={weHaveAWinner}>
          <div className="winner col-xs-12 text-center">
            {this.props.players[winnerId].name} won the game by narrowing it down to...
            <PersonChosen person={this.props.players[(winnerId === 0 ? 1 : 0)].chosenPerson} />
          </div>
        </If>
        <div className="col-xs-12 text-center">
          <a
            href="#"
            className="btn btn-info"
            onKeyPress={this.onResetGame}
            onClick={this.onResetGame}>
            {weHaveAWinner
              ? "Start Another Game?"
              : "Reset"}
          </a>
        </div>
        <If condition={!weHaveAWinner &&
          humanQuestionsUsed.length > 0 && botQuestionsUsed.length > 0}>
          <div className="row">
            <div className="col-offset-lg-4 col-lg-8">
              <div className="col-xs-6">
                <h3>Humans Used Questions</h3>
                <UsedQuestions questions={humanQuestionsUsed} />
              </div>
              <div className="col-xs-6">
                <h3>Bots Used Questions</h3>
                <UsedQuestions questions={botQuestionsUsed} />
                </div>
              </div>
          </div>
        </If>
        <div className="row human-board board">
          <div className="col-xs-12 col-md-4 col-sm-4 col-lg-4 text-center">
            <If condition={!weHaveAWinner}>
              {this.props.players[playerIds.human].chosenPerson
                ? <PersonChosen person={this.props.players[playerIds.human].chosenPerson} />
                : <ChooseAPerson person={this.props.players[playerIds.human].chosenPerson} />}
            </If>
            <If condition={!weHaveAWinner}>
              <Questions
                active={this.props.players[playerIds.human].currentTurn && this.props.players[playerIds.human].chosenPerson}
                limit={5}
                shuffle
                onQuestionChosen={this.onQuestionChosen}
                questions={this.props.questions[playerIds.human]}
              />
            </If>
            <div className="col-xs-12 bot-board board">
              <h3>Opponents Board</h3>
              <People
                showNameplate={false}
                hidePersonsFace={true}
                people={this.props.players[playerIds.bot].people}
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-8 col-sm-8 col-lg-8">
            <People
              people={this.props.players[playerIds.human].people}
              onPersonClicked={this.onPersonClicked}
            />
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

const UsedQuestions = ({ questions }) => {
  return (
    <ul>
      {questions.map((question, key) => {
        return (
          <li key={key}>
            {question.question}
          </li>
        );
      })}
    </ul>
  )
}

const Questions = (({ active, questions, shuffle=false, limit=false, onQuestionChosen }) => {
  let activeClass = active ? 'active' : ''
  if (shuffle) {
    questions = arrayShuffle(questions)
  }
  if (limit) {
    questions = questions.slice(0, limit)
  }
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

const People = (({ people, showNameplate, hidePersonsFace, onPersonClicked }) =>
  <div className="row people-collection">
    {people.map((person, key) =>
      <div className="col-xs-6 col-sm-4 col-md-4 col-lg-2"
        key={key}>
        <Person
          showNameplate={showNameplate}
          person={person}
          onPersonClicked={onPersonClicked}
          hidePersonsFace={hidePersonsFace}
        />
      </div>
    )}
  </div>
)

const PersonChosen = ({ person, hidePersonsFace = false }) => {
  return (
    <div className="row person-chosen">
      <div className="col-xs-12">
        <Person
          showNameplate={false}
          person={person}
          hidePersonsFace={hidePersonsFace}
        />
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

const Person = ({ person, showNameplate = true, hidePersonsFace = false, onPersonClicked }) => {
  let slug = toSlug(person.name),
    chosenClass = person.chosen
      ? 'chosen'
      : ''
  const namePlate = ((name) =>
    <h4 className="hidden-xs hidden-sm">
      {name}
    </h4>
  )
  if (hidePersonsFace) {
    slug = 'hidden-person'
    person.name = 'hidden'
  }
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
      {showNameplate ? namePlate(person.name) : ''}
    </div>
  )
}
