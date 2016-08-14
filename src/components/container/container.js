import React from 'react';
import Collection from './collection';
import Wrestlers from '../../data/wrestlers.json';

export default class Container extends React.Component {

  render() {
    return (
      <div>
        <Collection collection={Wrestlers} />
      </div>
    );
  }
}
