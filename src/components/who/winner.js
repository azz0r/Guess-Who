import React from 'react'

export const Winner = (({ player, person }) => {
  return (
    <div className="winner">
      <div className="col-xs-12">
        <h2>{player.name} has won!</h2>
        <p>{person.name} was the chosen character!</p>
      </div>
    </div>
  )
})
