import React from 'react';
import Wrestler from './wrestler';

export default class Collection extends React.Component {

  propTypes = {
    collection: React.propTypes.array.isRequired
  };

  render() {
    return (
      <div>
        {this.props.collection.map((wrestler) => {
          return (
            <Wrestler {...wrestler} />
          )
        })}
      </div>
    );
  }
}
