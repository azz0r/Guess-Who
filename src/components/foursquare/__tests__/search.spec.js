import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import faker from 'faker'
import Search from '../search'

describe('<Search />', () => {
  const props = {
    name: faker.lorem.sentence()
  }
  const wrapper = mount(<Search {...props} />)
  it('contains an <Search /> component', () => {
    expect(wrapper.find(Search)).to.have.length(1)
  })
})
