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
    const botPlayer = this.props.players[this.props.playerIds.bot]
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
              <div className="sidebar col-xs-12 col-md-4 col-sm-4 col-lg-4">
                <div className="row">
                  <Choose>
                    <When condition={humanPlayer.chosenPerson}>
                      <div className="col-xs-5">
                        <PersonChosen
                          person={humanPlayer.chosenPerson}
                          hidePersonsFace={!this.props.winner.awarded}
                        />
                      </div>
                    </When>
                    <Otherwise>
                      <div className="col-xs-12">
                        <ChooseAPerson person={humanPlayer.chosenPerson} />
                      </div>
                    </Otherwise>
                  </Choose>
                  <div className="col-xs-7">
                    <Questions
                      active={humanPlayer.currentTurn && humanPlayer.chosenPerson}
                      limit={12}
                      shuffle
                      onQuestionChosen={this.props.onQuestionChosen}
                      questions={this.props.questions[this.props.playerIds.human]}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    {resetButton}
                  </div>
                </div>
                <If condition={botPlayer.chosenPerson}>
                  <div className="row">
                    <div className="col-xs-12 board-wrapper board-2d">
                      <h3>Opponents Board</h3>
                      <p>Your opponent is guessing against <strong>{humanPlayer.chosenPerson.name}</strong> who you chose</p>
                      <People
                        people={botPlayer.people}
                        hidePersonsFace={true}
                        showNameplate={false}
                        onPersonClicked={() => {}}
                        hide-
                      />
                    </div>
                  </div>
                </If>
              </div>
              <div className="col-xs-12 col-md-8 col-sm-8 col-lg-8">
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
