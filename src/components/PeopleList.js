import React, {PropTypes} from 'react';
import Person from './Person';

const PeopleList = ({people}) => {
  return (
    <div>
      {people.map((person) =>
        <Person key={person.name} person={person} />  
      )}
    </div>
  );
};

PeopleList.propTypes = {
  people: PropTypes.array.isRequired
};

export default PeopleList;
