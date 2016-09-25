import React from 'react'
import { Questions } from './questions'
import { Winner } from './winner'
import { People, ChooseAPerson, PersonChosen } from './people'

export default class WhoPresentation extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    players: React.PropTypes.array.isRequired,
    questions: React.PropTypes.array.isRequired,
    winnerId: React.PropTypes.string.isRequired,
    onResetGame: React.PropTypes.func.isRequired,
    onPersonClicked: React.PropTypes.func.isRequired,
    onQuestionChosen: React.PropTypes.func.isRequired,
  }

  render() {
    const humanPlayer = this.props.players[this.props.playerIds.human]
    const resetButton = (
      <a
        href="#"
        className="btn cursor-pointer"
        onKeyPress={this.props.onResetGame}
        onClick={this.props.onResetGame}>
        Reset Game
      </a>
    )
    return (
      <div className="who-container">
        <Choose>
          <When condition={this.props.winner.awarded}>
            <Winner
              player={this.props.players[this.props.winner.id]}
              person={this.props.players[(this.props.winner.id === 0 ? 1 : 0)].chosenPerson}
            />
            {resetButton}
          </When>
          <Otherwise>
            <div className="row human-board">
              <div className="sidebar col-xs-12 col-md-3 col-sm-3 col-lg-3">
                  <Choose>
                    <When condition={humanPlayer.chosenPerson}>
                      <PersonChosen
                        person={humanPlayer.chosenPerson}
                        hidePersonsFace={!this.props.winner.awarded}
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
                    questions={this.props.questions[this.props.playerIds.human]}
                  />
                <div>
                  {resetButton}
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
          </Otherwise>
        </Choose>
      </div>
    )
  }
}
