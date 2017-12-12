import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import sinon from 'sinon'
import { getNotes, insertNote, removeNote, updateNote, fetchNotes, castVote, addNote } from './notes'

if (!global.window){
  const MockBrowser = require('mock-browser').mocks.MockBrowser
  global.window = new MockBrowser().getWindow();
}

describe('Notes Tests', () => {
  let noteOne, noteTwo, noteThree
  let text = 'text for noteOne', link = 'www.cnn.com', position = [1000, 1000], text3 = 'text for noteThree'
  beforeEach(() => {
    noteOne = {id: 1, text, position}
    noteTwo = {id: 2, link, position}
    noteThree = {id: 3, text: text3, position}
  })

  describe('action creators', () => {
    it('getNotes returns a GET_NOTES action', () => {
      const action = getNotes([noteOne, noteTwo, noteThree])
      expect(action).to.deep.equal({
        type: 'GET_NOTES',
        notes: [noteOne, noteTwo, noteThree]
      })
    })

    it('insertNote returns INSERT_NOTE action', () => {
      const action = insertNote(noteTwo)
      expect(action).to.deep.equal({
        type: 'INSERT_NOTE',
        note: noteTwo
      })
    })

    it('removeNote returns REMOVE_NOTE action', () => {
      const action = removeNote(noteTwo.id)
      expect(action).to.deep.equal({
        type: 'REMOVE_NOTE',
        noteId: 2
      })
    })

    it('updateNote returns UPDATE_NOTE action', () => {
      const action = updateNote(noteOne)
      expect(action).to.deep.equal({
        type: 'UPDATE_NOTE',
        note: noteOne
      })
    })
  })

  describe('thunk creators', () => {
    const mockAxios = new MockAdapter(axios)
    const mockStore = configureMockStore([thunkMiddleware])

    const store = mockStore({ notes: [] })

    afterEach(() => store.clearActions())

    it('fetchNotes make GET request', () => {
      mockAxios.onGet('/api/whiteboards/1').replyOnce(200, [noteOne, noteTwo, noteThree])

      sinon.spy(axios, 'get')

      return store.dispatch(fetchNotes(1))
        .then(() => {
          expect(axios.get.calledOnce).to.equal(true)
          expect(axios.get.calledWith('/api/whiteboards/1')).to.equal(true)

          const actions = store.getActions()
          expect(actions[0].type).to.equal('GET_NOTES')
          expect(actions[0].notes).to.deep.equal([noteOne, noteTwo, noteThree])
        })

    })

    it('castVote makes PUT request', () => {
      mockAxios.onPut('/api/notes/vote/1').replyOnce(200, { id: 1, text: 'edit for note one', position})

      sinon.spy(axios, 'put')

      return store.dispatch(castVote(1))
        .then(() => {
          expect(axios.put.calledOnce).to.equal(true)
          expect(axios.put.calledWith('/api/notes/vote/1')).to.equal(true)

          const actions = store.getActions()
          expect(actions[0].type).to.equal('UPDATE_NOTE')
          expect(actions[0].note.text).to.equal('edit for note one')
        })
    })

    it('addNote makes POST request', () => {
      let noteFour = { id: 4, text: 'text for note no. 4', position }
      mockAxios.onPost('/api/notes').replyOnce(200, noteFour)

      sinon.spy(axios, 'post')

      return store.dispatch(addNote(noteFour))
        .then(() => {
          expect(axios.post.calledOnce).to.equal(true)
          expect(axios.post.calledWith('/api/notes')).to.equal(true)

          const actions = store.getActions()
          expect(actions[0].type).to.equal('INSERT_NOTE')
          expect(actions[0].note).to.deep.equal(noteFour)
        })

    })

  })
})
