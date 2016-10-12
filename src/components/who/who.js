import React from 'react'
import Presentation from './presentation'
import * as PlayersActions from '../../actions/players'
import * as QuestionActions from '../../actions/questions'
import { connect } from 'react-redux'
import { pickRandom } from './helpers'
import { playerIds } from './players'

class Who extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    players: React.PropTypes.array.isRequired,
    questions: React.PropTypes.array.isRequired,
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
    this.onQuestionChosen(
      question
    )
  }

  getBotsQuestion = () => {
    let botQuestions = this.props.questions[playerIds.bot]
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
    let enemyPerson = this.props.players[this.getCurrentEnemyId()].chosenPerson
    return Boolean(enemyPerson[question.key] && enemyPerson[question.key] === question.value)
  }

  _getWinner(awarded = false, id = false) {
    this.props.players.forEach((player, key) => {
      if (player.people.filter((person) => !person.chosen).length === 1) {
        id = key
        awarded = true
      }
    })
    return {
      id,
      awarded
    }
  }

  render() {
    return (
      <Presentation
        {...this.props}
        winner={this._getWinner()}
        playerIds={playerIds}
        onResetGame={this.onResetGame}
        onPersonClicked={this.onPersonClicked}
        onQuestionChosen={this.onQuestionChosen}
       />
    )
  }
}

export default connect(state => ({
  players: state.players,
  questions: state.questions,
}))(Who)
