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
    modal: React.PropTypes.array.isRequired,
    winner: React.PropTypes.object.isRequired,
    onResetGame: React.PropTypes.func.isRequired,
    onCloseModal: React.PropTypes.func.isRequired,
    onPersonClicked: React.PropTypes.func.isRequired,
    onQuestionChosen: React.PropTypes.func.isRequired,
  }

  render() {
    const humanPlayer = this.props.players[playerIds.human],
      botPlayer = this.props.players[playerIds.bot];
    return (
      <div className="who-container">
        <Choose>
          <When condition={this.props.modal.open && !this.props.winner.hasWinner}>
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
                  onClick={this.props.onCloseModal}>
                  Your Turn
                </a>
              </div>
            </div>
            <div className="row">
              <div className="sidebar col-xs-12 col-md-3 col-sm-3 col-lg-3 text-center">
                <h2>Your chosen character</h2>
                <PersonChosen
                  person={humanPlayer.chosenPerson}
                />
              </div>
              <div className="col-xs-9 zoom-out-5">
                <div className="board-wrapper">
                  <People
                    people={botPlayer.people}
                    hidePersonsFace
                  />
                </div>
              </div>
            </div>
          </When>
          <When condition={this.props.winner.hasWinner}>
            <div className="winner col-xs-12 text-center">
              {this.props.players[this.props.winner.id].name} won the game by narrowing it down to...
              <PersonChosen
                person={this.props.players[(this.props.winner.id === 0 ? 1 : 0)].chosenPerson}
              />
              <p>
                <a
                  href="#"
                  className="btn cursor-pointer"
                  onKeyPress={this.props.onResetGame}
                  onClick={this.props.onResetGame}>
                  Play again?
                </a>
              </p>
            </div>
          </When>
          <Otherwise>
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
          </Otherwise>
        </Choose>
      </div>
    )
  }
}
