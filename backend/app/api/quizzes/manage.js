const { Router } = require("express");

const { Quiz } = require("../../models");
const { Question } = require("../../models");
const questionRouter = require("./questions");
const { filter } = require("./questions/manage");

const router = new Router();

exports.findQuestions = (quiz) =>
{
    const ques = Question.get();
    return filter(quiz.id, ques, "quizId");
};


router.use("/:quizId/questions", questionRouter);
