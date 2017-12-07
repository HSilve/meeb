const { expect } = require('chai')
const db = require('../index')
const Note = require('./note')

describe('Notes model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instance methods', () => {
    let centralNote
    let image = 'https://www.pexels.com/photo/clouds-dark-clouds-dawn-outdoors-105666/', link = 'www.github.com', text = 'A new idea in the middle', position = [1000, 1000]

    beforeEach(() => {
      return Note.create({
        image, link, text, position
      })
        .then(note => { centralNote = note })
    })

    describe('fields', () => {
      it('has image, link, text, position, highlighted, color, and votes', () => {
        expect(centralNote.image).to.be.equal(image)
        expect(centralNote.link).to.be.equal(link)
        expect(centralNote.text).to.be.equal(text)
        expect(centralNote.position).to.deep.equal(position)
        expect(centralNote.highlighted).to.be.equal(false)
        expect(centralNote.votes).to.be.equal(0)
      })
    })
  })
})
