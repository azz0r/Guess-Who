import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import Venues from '../venues'

describe('<Venues />', () => {
  const props = {
    venues: []
  }
  const wrapper = mount(<Venues {...props} />)
  it('contains an <Venues /> component', () => {
    expect(wrapper.find(Venues)).to.have.length(1)
  })
  it('allows us to set props', () => {
    wrapper.setProps({ venues: new Array(2) })
    expect(wrapper.props().venues.length).to.equal(2)
  })
})
