import { Body, Controller, Get, OnNull, Param, Post } from "routing-controllers";
import Quiz from "../models/Quiz";
import Question from "../models/Question";
import QuizTheme from "../models/QuizTheme";
import sequelize from "sequelize";

@Controller("/quizzes")
export default class QuizController
{
    @Get("/")
    async getAll(): Promise<Quiz[]>
    {
        return await Quiz.findAll({
            include: [
                { model: QuizTheme, attributes: ["id", "name"] },
                { model: Question, attributes: [] }
            ],
            attributes: { include: [[sequelize.fn("COUNT", sequelize.col("Questions.id")), "questionCount"]] },
            group: ["Quiz.id"]
        });
    }

    @Get("/:id")
    @OnNull(404)
    async getOne(@Param("id") id: number): Promise<Quiz | null>
    {
        return await Quiz.findByPk(id, { include: { model: Question } });
    }

    @Post("/")
    async create(@Body() quiz: Quiz)
    {
    }
}
