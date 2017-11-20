const router = require('express').Router()
const { Note } = require('../db/models')
const { AWS_ACCESS_KEY_ID, SECRET_ACCESS_KEY} = require('../../secrets.js')
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

router.post('/', (req, res, next) => {
  console.log(req.body.note)
  console.log(req.body.note.file.length)
  if (req.body.note.file.length !== 0) {
    AWS.config.update(
      {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
      }
    )
    const s3 = new AWS.S3()

    s3.putObject({
      ACL: 'public-read',
      Bucket: 'meeb-whiteboard',
      Key: req.body.note.imageName,
      Body: new Buffer((req.body.note.file).split(',')[1], 'base64'),
      ContentType: req.body.note.fileType,
    }, (err) => {
        if (err) console.log(err)
        else {
          console.log('File uploaded to S3')
          req.body.note.image = `https://s3.amazonaws.com/meeb-whiteboard/${req.body.note.imageName}`

          Note.create(req.body.note)
            .then(note => {
              res.json(note)
            })
            .catch(next);
        }
    })
  }
  else {
    Note.create(req.body.note)
    .then(note => {
      res.json(note)
    })
    .catch(next);
  }
})

router.put('/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => note.update(req.body))
    .then(_ => {
      Note.findById(req.params.id)
      .then(updatedNote => res.json(updatedNote))
    })
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Note.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
})
