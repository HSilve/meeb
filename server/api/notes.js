const router = require('express').Router()
const { Note, Branch } = require('../db/models')
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || require('../../secrets.js').AWS_ACCESS_KEY_ID
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY || require('../../secrets.js').SECRET_ACCESS_KEY
const AWS = require('aws-sdk')

module.exports = router

router.get('/', (req, res, next) => {
  Note.findAll()
    .then(notes => res.json(notes))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(next);
})

AWS.config.update(
  {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  }
)
const s3 = new AWS.S3()

router.post('/', (req, res, next) => {
  Note.create(req.body.note)
    .then(note => {
      if (req.body.note.file && req.body.note.file.length !== 0) {
        s3.putObject({
          ACL: 'public-read',
          Bucket: 'meeb-whiteboard',
          Key: `${note.id}-${req.body.note.imageName}`,
          Body: new Buffer((req.body.note.file).split(',')[1], 'base64'),
          ContentType: req.body.note.fileType,
        }, (err) => {
          if (err) { console.log(err) }
          else {
            console.log('File uploaded to S3')
            note.update({ image: `https://s3.amazonaws.com/meeb-whiteboard/${note.id}-${req.body.note.imageName}` }, {
              returning: true, plain: true
            })
              .then(result => {
                res.json(result)
              })
          }
        }
        )
      } else {
        res.json(note)
      }
    })
})

router.put('/vote/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      let vts = note.votes + 1;

      return note.update({ votes: vts }, {
        returning: true,
        plain: true
      })
    })
    .then(data => {
      res.json(data)
    })
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      return note.update(req.body, {
        returning: true,
        plain: true
      })
    })
    .then(data => {
      res.json(data)
    })
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Note.destroy({ where: { id } })
    .then(_ => {
      Branch.destroy({
        where: {
          $or: [{
              noteId: id
            }, {
              endNoteId: id
            }]
          }
      })
      .then(_ => res.status(204).end())
  })
    .catch(next);
})
