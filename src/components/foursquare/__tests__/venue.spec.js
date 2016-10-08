import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import faker from 'faker'
import Venue from '../venue'

describe('<Venue />', () => {
  const props = {
    name: faker.lorem.sentence()
  }
  const wrapper = mount(<Venue {...props} />)
  it('contains an <Venue /> component', () => {
    expect(wrapper.find(Venue)).to.have.length(1)
  })
  it('allows us to set props', () => {
    const name = faker.lorem.sentence()
    wrapper.setProps({ name })
    expect(wrapper.find('.venue__name').text().trim()).to.equal(name)
  })
})
