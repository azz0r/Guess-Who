import React from 'react';

export default class Wrestler extends React.Component {

  propTypes = {
    "name": React.propTypes.string.isRequired,
    "male": React.propTypes.bool.isRequired,
    "hair": React.propTypes.bool.isRequired,
    "hairColor": React.propTypes.string,
    "eyeColor": React.propTypes.string,
    "hat": React.propTypes.bool.isRequired,
    "hatColor": React.propTypes.string,
    "shirt": React.propTypes.bool.isRequired,
    "shirtColor": React.propTypes.string,
    "cape": React.propTypes.bool.isRequired,
    "beard": React.propTypes.string,
    "beardColor": React.propTypes.string,
  };

  render() {
    return (
      <div className="wrestler col-lg-2 col-xs-8">
        {this.props.name}
      </div>
    );
  }
}
