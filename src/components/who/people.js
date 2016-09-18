import React from 'react'
import { toSlug, getNumberAsString } from './helpers'

export const People = (({ people, showNameplate, hidePersonsFace, onPersonClicked }) => {
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

export const PersonChosen = ({ person, hidePersonsFace}) => {
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

export const ChooseAPerson = () => {
  return (
    <div>
      <h2>Choose your character</h2>
      <p>Click on the character you wish to represent you, your opponent will be guessing against that character!</p>
      <p>Choose your character by clicking them on the board to the right ↪</p>
    </div>
  )
}

export const Person = ({ person, showNameplate = true, cardNumber='first', hidePersonsFace = false, onPersonClicked }) => {
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
