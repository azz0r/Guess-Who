import React from 'react'
import { Questions } from './questions'
import { People, ChooseAPerson, PersonChosen } from './people'

const playerIds = {
  human: 0,
  bot: 1
}

export default class WhoPresentation extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    players: React.PropTypes.array.isRequired,
    questions: React.PropTypes.array.isRequired,
    winner: React.PropTypes.object.isRequired,
    onResetGame: React.PropTypes.func.isRequired,
    onPersonClicked: React.PropTypes.func.isRequired,
    onQuestionChosen: React.PropTypes.func.isRequired,
  }

  render() {
    const humanPlayer = this.props.players[playerIds.human],
      botPlayer = this.props.players[playerIds.bot];
    return (
      <div className="who-container">
        <div className="row human-board">
          <div className="sidebar col-xs-12 col-md-3 col-sm-3 col-lg-3">
              <Choose>
                <When condition={humanPlayer.chosenPerson}>
                  <PersonChosen
                    person={humanPlayer.chosenPerson}
                    hidePersonsFace
                  />
                </When>
                <Otherwise>
                  <ChooseAPerson person={humanPlayer.chosenPerson} />
                </Otherwise>
              </Choose>
              <Questions
                active={humanPlayer.currentTurn && humanPlayer.chosenPerson}
                limit={5}
                shuffle
                onQuestionChosen={this.props.onQuestionChosen}
                questions={this.props.questions[playerIds.human]}
              />
            <div>
              <a
                href="#"
                className="btn cursor-pointer"
                onKeyPress={this.props.onResetGame}
                onClick={this.props.onResetGame}>
                Reset Game
              </a>
            </div>
          </div>
          <div className="col-xs-9">
            <div className="board-wrapper">
              <People
                people={humanPlayer.people}
                onPersonClicked={this.props.onPersonClicked}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
