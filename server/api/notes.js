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
  AWS.config.update(
    {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    }
  )
  const s3 = new AWS.S3()

  s3.putObject({
    Bucket: 'meeb-whiteboard',
    Key: req.body.note.imageName,
    Body: new Buffer((req.body.note.file).split(',')[1], 'base64'),
    ContentType: req.body.note.fileType,
    ACL: 'public-read'
  }, (err) => {
      if (err) console.log(err);
      console.log('File uploaded to S3');
  })

  req.body.note.image = `https://s3.amazonaws.com/meeb-whiteboard/${req.body.note.imageName}`

  Note.create(req.body.note)
    .then(note => {
      res.json(note)
    })
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => res.json(note.update(req.body)))
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Note.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
})
