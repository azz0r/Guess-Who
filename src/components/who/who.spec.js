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
  console.log(props)
  it('contains an <Who /> component', () => {
    expect(wrapper.find(Who)).to.have.length(1)
  })
})
