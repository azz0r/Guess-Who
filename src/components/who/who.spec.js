import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Who from './who';
import configureStore from '../../store/configure-store';
import { Provider } from 'react-redux';

const store = configureStore()

describe('<Who />', () => {
  const mainWrapper = mount(
    <Provider store={store}>
      <Who />
    </Provider>
  )
  const wrapper = mainWrapper.find(Who)
  let props = wrapper.find(Who).map(i => i.props());
  it('contains an <Who /> component', () => {
    expect(wrapper.find(Who)).to.have.length(1)
  })
  it('has stephanie mcmahon as the human board chosen character', () => {
    expect(wrapper.find('.person-chosen .person.stephanie-mcmahon')).to.have.length(1)
  })
  it('has rusev as the cpu board chosen character', () => {
    expect(wrapper.find('.person-chosen .person.rusev')).to.have.length(1)
  })
  it('has enough characters on the human board', () => {
    expect(wrapper.find('.human-board .people-collection .person')).to.have.length(21)
  })
  it('has enough characters on the bot board', () => {
    expect(wrapper.find('.bot-board .people-collection .person')).to.have.length(21)
  })
  // it('will click a question and check the results are correct', () => {
  //   wrapper.find('.human-board .is-your-character-male').simulate('click');
  //   console.log(wrapper.find('.bot-board .people-collection .person.chosen'))
  //   expect(wrapper.find('.bot-board .people-collection .person.chosen')).to.have.length(21)
  // })
})
