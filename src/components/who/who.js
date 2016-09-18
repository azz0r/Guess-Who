import React, { PropTypes, Component } from 'react'
import arrayShuffle from 'array-shuffle'
import * as PlayersActions from '../../actions/players'
import * as QuestionActions from '../../actions/questions'
import * as ModalActions from '../../actions/modal'
import { connect } from 'react-redux'
import { toSlug, pickRandom, getNumberAsString } from './helpers'

const playerIds = {
  human: 0,
  bot: 1
}
class Who extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired,
    modal: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.gameTick = setInterval(
      this.shouldBotTakeTurn,
      5000
    )
  }

  componentWillUnmount() {
    clearInterval(this.gameTick)
  }

  shouldComponentUpdate() {
    return true
  }

  onCloseModal = () => {
    this.props.dispatch(
      ModalActions.set(false),
    )
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
      let peopleForCPU = this.props.players[playerIds.human].people.filter((person) => person.id !== chosenPerson.id)
      this.props.dispatch([
        PlayersActions.chosePerson(
          chosenPerson,
          playerIds.human,
        ),
        PlayersActions.chosePerson(
          pickRandom(peopleForCPU),
          playerIds.bot,
        ),
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

  onsBotTurn = () => {
    let question = this.getBotsQuestion()
    this.props.dispatch(
      ModalActions.set(
        true,
        `${this.props.players[this.getCurrentPlayerId()].name} asked ${question.question}`,
        `The answer is ${this.doTheyHave(question)}`,
      )
    )
    this.onQuestionChosen(
      question
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
      winnerId,
    }
  }

  render() {
    let { weHaveAWinner, winnerId } = this._getWinner()
    return (
      <div className="who-container">
        <Choose>
          <When condition={this.props.modal.open && !weHaveAWinner}>
            <div className="row text-center">
              <h3>Opponents turn!</h3>
              <h3>
                {this.props.modal.question}
              </h3>
              <div className="text-center">
                <Choose>
                  <When condition={this.props.modal.answer === true}>
                    <img src="/static/imgs/yes.png" role="presentation" />
                  </When>
                  <Otherwise>
                    <img src="/static/imgs/no.gif" role="presentation" />
                  </Otherwise>
                </Choose>
              </div>
              <br />
              <div>
                <a
                  className="btn"
                  onClick={this.onCloseModal}>
                  Your Turn
                </a>
              </div>
            </div>
            <div className="row">
              <div className="sidebar col-xs-12 col-md-4 col-sm-4 col-lg-4 text-center">
                <h2>Your chosen character</h2>
                <PersonChosen
                  person={this.props.players[playerIds.human].chosenPerson}
                />
              </div>
              <div className="col-xs-8 zoom-out-5">
                <div className="board-wrapper">
                  <People
                    people={this.props.players[playerIds.bot].people}
                    hidePersonsFace
                  />
                </div>
              </div>
            </div>
          </When>
          <When condition={weHaveAWinner}>
            <div className="winner col-xs-12 text-center">
              {this.props.players[winnerId].name} won the game by narrowing it down to...
              <PersonChosen
                person={this.props.players[(winnerId === 0 ? 1 : 0)].chosenPerson}
              />
              <p>
                <a
                  href="#"
                  className="btn cursor-pointer"
                  onKeyPress={this.onResetGame}
                  onClick={this.onResetGame}>
                  Play again?
                </a>
              </p>
            </div>
          </When>
          <When condition={!weHaveAWinner}>
            <div className="row human-board">
              <div className="sidebar col-xs-12 col-md-4 col-sm-4 col-lg-4">
                  <Choose>
                    <When condition={this.props.players[playerIds.human].chosenPerson}>
                      <PersonChosen
                        person={this.props.players[playerIds.human].chosenPerson}
                        hidePersonsFace
                      />
                    </When>
                    <Otherwise>
                      <ChooseAPerson person={this.props.players[playerIds.human].chosenPerson} />
                    </Otherwise>
                  </Choose>
                  <Questions
                    active={this.props.players[playerIds.human].currentTurn && this.props.players[playerIds.human].chosenPerson}
                    limit={5}
                    shuffle
                    onQuestionChosen={this.onQuestionChosen}
                    questions={this.props.questions[playerIds.human]}
                  />
                <div>
                  <a
                    href="#"
                    className="btn cursor-pointer"
                    onKeyPress={this.onResetGame}
                    onClick={this.onResetGame}>Reset Game
                  </a>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="board-wrapper">
                  <People
                    people={this.props.players[playerIds.human].people}
                    onPersonClicked={this.onPersonClicked}
                  />
                </div>
              </div>
            </div>
          </When>
        </Choose>
      </div>
    )
  }
}

export default connect(state => ({
  players: state.players,
  questions: state.questions,
  modal: state.modal,
}))(Who)

const Questions = (({ active, questions, shuffle = false, limit = false, onQuestionChosen }) => {
  let activeClass = active ? 'active' : ''
  if (shuffle) {
    questions = arrayShuffle(questions)
    questions = questions.filter((question) => !question.used)
  }
  if (limit) {
    questions = questions.slice(0, limit)
  }
  return (
    <div className={`row questions ${(activeClass)}`}>
      <div className="col-xs-12">
        <ul>
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
    <li>
      <a href="#"
        className={questionClasses}
        onKeyPress={onQuestionChosen.bind(this, question)}
        onClick={onQuestionChosen.bind(this, question)}>
        {question.question}
      </a>
    </li>
  )
}

const People = (({ people, showNameplate, hidePersonsFace, onPersonClicked }) => {
  let
    rowNumber = 1,
    cardNumber = 0;
  return (
    <div className="board">
      {people.map((person, key) => {
        if (cardNumber === 7) {
          cardNumber = 0;
          rowNumber++;
        }
        cardNumber++
        return (
          <div
            className={`card-row ${getNumberAsString(rowNumber)}-card-row`}
            key={key}>
            <Person
              showNameplate={showNameplate}
              person={person}
              cardNumber={getNumberAsString(cardNumber)}
              onPersonClicked={onPersonClicked}
              hidePersonsFace={hidePersonsFace}
            />
          </div>
        )
      })}
    </div>
  )
})

const PersonChosen = ({ person, hidePersonsFace}) => {
  let
    fullName = person.name,
    slug = toSlug(person.name)
  if (hidePersonsFace) {
    slug = 'hidden-person'
    fullName = 'hidden'
  }
  return (
    <div className="row person-chosen">
      <div className="col-xs-12">
        <p>
          <img
            src={`/static/imgs/${slug}.png`}
            title={fullName}
            alt={fullName}
            className="avatar-img"
          />
        </p>
        </div>
      </div>
  )
}

const ChooseAPerson = () => {
  return (
    <div>
      <h2>Choose your character</h2>
      <p>Click on the character you wish to represent you, your opponent will be guessing against that character!</p>
    </div>
  )
}

const Person = ({ person, showNameplate = true, cardNumber='first', hidePersonsFace = false, onPersonClicked }) => {
  let
    slug = toSlug(person.name),
    fullName = person.name,
    chosenClass = person.chosen
      ? 'down'
      : 'up';
  const namePlate = ((name) =>
    <h4>
      {name}
    </h4>
  )
  if (hidePersonsFace) {
    slug = 'hidden-person'
    fullName = 'hidden'
  }
  return (
    <div className={`${slug} ${chosenClass} ${cardNumber} card text-center`}>
      <p>
        <img
          src={`/static/imgs/${slug}.png`}
          title={fullName}
          alt={fullName}
          className="avatar-img"
          onClick={onPersonClicked ? onPersonClicked.bind(this, person) : null}
        />
      </p>
      {showNameplate ? namePlate(fullName) : ''}
    </div>
  )
}
