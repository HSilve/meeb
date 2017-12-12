import React from 'react'
import { expect } from 'chai'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
enzyme.configure({ adapter: new Adapter() })

if (!global.window){
  console.log('inside mock browser condition')
  const MockBrowser = require('mock-browser').mocks.MockBrowser
  global.window = new MockBrowser().getWindow();
  global.document = new MockBrowser().getDocument()
  global.$ = require('jquery')
  // var { Home } = require('./Home')
  var { ActionPanel } = require('./index')
}


describe('Frontend tests', () => {
  describe('ActionPanel component', () => {
    let wrapper, instance, mockOnSubmit
    beforeEach(() => {
      mockOnSubmit = sinon.spy()

      wrapper = shallow(<ActionPanel.WrappedComponent
        whiteboard={{ closed: false, userId: 1, swimlane: 0 }}
        user={{ id: 1 }}
        handleSubmit={mockOnSubmit}
        match={{params: { id: 1 }}}
        notes={[]}
        updateRoom={() => {}}
        hideBranches={() => {}}
        showBranches={() => {}}
      />)
      instance = wrapper.instance()
    })

    it('renders without problem', () => {
      expect(wrapper).to.have.length(1)
    })

    it('toggle method works', () => {
      instance.toggle('text')
      expect(instance.state.textToggle).to.equal(true)
    })

    it('handleSubmit works when form is submitted', () => {
      wrapper.find('form').simulate('submit', { target: { name: 'name', value: 'test', file: { value: 'fake_file' }}, preventDefault: () => {} })
      expect(mockOnSubmit.calledOnce).to.equal(true)
    })

    it('should render swimlanes and toggle off branches', () => {
      sinon.spy(instance, 'onClickVertical')
      wrapper.find('a.swimlanes').simulate('click', { target: { name: 'name', value: 'test'}, preventDefault: () => {} } )

      expect(instance.state.toggleBranches).to.equal(false)
      expect(instance.onClickVertical.calledOnce).to.equal(true)
    })

    it('toggleBranches should work', () => {
      sinon.spy(instance, 'toggleBranches')
      wrapper.find('a.branches').simulate('click', { target: { name: 'name' }})
      expect(instance.state.toggleBranches).to.equal(false)
      wrapper.find('a.branches').simulate('click', { target: { name: 'name' }})
      expect(instance.state.toggleBranches).to.equal(true)
      expect(instance.toggleBranches.calledTwice).to.equal(true)
    })
  })
})
