const { Router } = require('express')
const { filter } = require('./../manage')

const { Answer } = require('../../../../models')


const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    res.status(200)
      .json(filter(parseInt(req.params.questionId), Answer.get(), 'questionId'))
  } catch (err) {
    res.status(500)
      .json(err)
  }
})

router.get('/:answerId', (req, res) => {
  try {
    if (Answer.getById(req.params.answerId).questionId !== parseInt(req.params.questionId)) {
      throw new Error()
    }
    res.status(200)
      .json(Answer.getById(req.params.answerId))
  } catch (err) {
    res.status(500)
      .json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const answer = Answer.create({ ...req.body, questionId: parseInt(req.params.questionId) })
    res.status(201)
      .json(answer)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400)
        .json(err.extra)
    } else {
      res.status(500)
        .json(err)
    }
  }
})

module.exports = router
