const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = request.agent(app)
const Note  = db.model('note')

describe('Notes routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/notes/', () => {
    let noteOne, noteTwo
    let text = 'text for noteOne', link = 'www.cnn.com', position = [1000, 1000], text3 = 'text for noteThree'
    beforeEach(() => {
      return Note.create({
        text, position
      })
        .then(note => {
          noteOne = note
          return Note.create({
            link, position
          })
            .then(anotherNote => { noteTwo = anotherNote})
        })
    })

    it('GET /api/notes/', () => {
      return request(app)
        .get('/api/notes')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].text).to.be.equal(text)
          expect(res.body[0].link).to.be.equal(null)
          expect(res.body[1].link).to.be.equal(link)
          expect(res.body[1].position).to.deep.equal(position)
          expect(res.body[1].highlighted).to.be.equal(false)
        })
    })

    it('GET /api/notes/:noteId', () => {
      return request(app)
        .get(`/api/notes/${noteOne.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.text).to.be.equal(text)
          expect(res.body.link).to.be.equal(null)
        })
    })

    it('POST /notes', () => {
      return request(app)
        .post('/api/notes')
        .send({
          note: { text: text3, position, link }
        })
        .expect(200)
        .expect(res => {
          expect(res.body.text).to.be.equal(text3)
          expect(res.body.position).to.deep.equal(position)
          expect(res.body.link).to.equal(link)
        })
    })

    // it('PUT /vote/:id', () => {
    //   return request(app)
    //     .put(`api/notes/vote/${noteOne.id}`)
    //     .expect(200)
    //     .expect(res => {
    //       expect(res.body.votes).to.be.equal(1)
    //     })
    // })

    it('PUT /:id', () => {
      return request(app)
        .put(`/api/notes/${noteOne.id}`)
        .send({ text: 'new text for noteOne'})
        .expect(200)
        .expect(res => {
          expect(res.body.text).to.be.equal('new text for noteOne')
        })
    })

    it('DELETE /:id', () => {
      return request(app)
        .delete(`/api/notes/${noteTwo.id}`)
        .expect(204)
        .then(_ => {
          Note.findById(noteTwo.id)
          .then(note => {
            expect(note).to.be.equal(null)
          })
        })
    })
  })
})
