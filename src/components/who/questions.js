import React from 'react'
import arrayShuffle from 'array-shuffle'
import { toSlug } from './helpers'

export const Questions = (({ active, questions, shuffle = false, limit = false, onQuestionChosen }) => {
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

export const Question = ({ question, onQuestionChosen }) => {
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
