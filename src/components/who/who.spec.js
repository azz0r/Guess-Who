import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Who from './who';
import configureStore from '../../store/configure-store';
import { Provider } from 'react-redux';

const store = configureStore()

describe('<Who />', () => {
  const props = {}
  const wrapper = mount(<Provider store={store}><Who /></Provider>)
  it('contains an <Who /> component', () => {
    expect(wrapper.find(Who)).to.have.length(1)
  })
  it('has 2 players', () => {
    console.log(wrapper.props())
    expect(wrapper.props().players.length).to.equal(2);
  });
  it('has 19 people per player', () => {
    expect(wrapper.props().players[0].people.length).to.equal(21);
    expect(wrapper.props().players[1].people.length).to.equal(21);
  });
})
