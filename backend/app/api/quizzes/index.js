const { Router } = require("express");

const { Quiz } = require("../../models");
const questionRouter = require("./questions");
const { findQuestions } = require("./manage");

const router = new Router();

router.get("/", (req, res) =>
{
    try
    {
        res.status(200)
            .json(Quiz.get());
    }
    catch (err)
    {
        res.status(500)
            .json(err);
    }
});

router.get("/:quizId", (req, res) =>
{
    try
    {
        const quiz = Quiz.getById(req.params.quizId);
        const questions = findQuestions(quiz);
        res.status(200)
            .json({ ...quiz, questions });
    }
    catch (err)
    {
        res.status(500)
            .json(err);
    }
});

router.post("/", (req, res) =>
{
    try
    {
        const quiz = Quiz.create({ ...req.body });
        res.status(201)
            .json(quiz);
    }
    catch (err)
    {
        if (err.name === "ValidationError")
        {
            res.status(400)
                .json(err.extra);
        }
        else
        {
            res.status(500)
                .json(err);
        }
    }
});

router.delete("/:quizId", (req, res) =>
{
    try
    {
        res.status(200)
            .json(Quiz.delete(req.params.quizId));
    }
    catch (err)
    {
        res.status(500)
            .json(err);
    }
});

router.put("/:quizId", (req, res) =>
{
    try
    {
        res.status(200)
            .json(Quiz.update(req.params.quizId, req.body));
    }
    catch (err)
    {
        res.status(500)
            .json(err);
    }
});


router.use("/:quizId/questions", questionRouter);
module.exports = router;
