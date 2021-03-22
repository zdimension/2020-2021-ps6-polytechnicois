const { Router } = require('express')

const { User } = require('../../models')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200)
      .json(User.get())
  } catch (err) {
    res.status(500)
      .json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    res.status(200)
      .json(User.getById(req.params.quizId))
  } catch (err) {
    res.status(500)
      .json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = User.create({ ...req.body })
    res.status(201)
      .json(quiz)
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

router.delete('/:quizId', (req, res) => {
  try {
    res.status(200)
      .json(User.delete(req.params.quizId))
  } catch (err) {
    res.status(500)
      .json(err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200)
      .json(User.update(req.params.quizId, req.body))
  } catch (err) {
    res.status(500)
      .json(err)
  }
})

module.exports = router
