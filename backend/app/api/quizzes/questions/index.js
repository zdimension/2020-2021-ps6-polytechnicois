const { Router } = require('express')
const { filter } = require('./manage')
const { createEmptyQuestion } = require('./manage')

const { Quiz } = require('../../../models')
const { Question } = require('../../../models')
const answerRouter = require('./answers')
const { findAnswers } = require('./manage')

const router = new Router({ mergeParams: true })


router.get('/', (req, res) => {
  try {
    res.status(200)
      .json(filter(parseInt(req.params.quizId), Question.get(), 'quizId'))
  } catch (err) {
    res.status(500)
      .json(err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    if (Question.getById(req.params.questionId).quizId !== parseInt(req.params.quizId)) {
      throw new Error()
    }
    const quest = Question.getById(req.params.questionId)
    const answers = findAnswers(quest)
    res.status(200)
      .json({ ...quest, answers })
  } catch (err) {
    res.status(500)
      .json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const question = createEmptyQuestion(req.body, parseInt(req.params.quizId))
    res.status(201)
      .json(question)
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

router.delete('/:questionId', (req, res) => {
  try {
    if (Question.getById(req.params.questionId).quizId !== parseInt(req.params.quizId)) {
      throw new Error()
    }
    res.status(200)
      .json(Question.delete(req.params.questionId))
  } catch (err) {
    res.status(500)
      .json(err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    if (Question.getById(req.params.questionId).quizId !== parseInt(req.params.quizId)) {
      throw new Error()
    }
    res.status(200)
      .json(Question.update(req.params.questionId, req.body))
  } catch (err) {
    res.status(500)
      .json(err)
  }
})

router.use('/:questionId/answers', answerRouter)
module.exports = router
