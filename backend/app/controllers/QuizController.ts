import { Body, Controller, Get, OnNull, Param, Post } from "routing-controllers";
import Quiz from "../models/Quiz";
import Question from "../models/Question";
import QuizTheme from "../models/QuizTheme";

@Controller("/quizzes")
export default class QuizController
{
    @Get("/")
    async getAll(): Promise<Quiz[]>
    {
        return await Quiz.findAll({ include: { model: QuizTheme, attributes: ["id", "name"] } });
    }

    @Get("/:id")
    @OnNull(404)
    async getOne(@Param("id") id: number): Promise<Quiz | null>
    {
        return await Quiz.findByPk(id, { include: { model: Question } }) || null;
    }

    @Post("/")
    async create(@Body() quiz: Quiz)
    {
    }
}
