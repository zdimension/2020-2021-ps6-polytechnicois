import { Body, CurrentUser, Get, JsonController, OnNull, Param, Post } from "routing-controllers";
import Quiz from "../models/Quiz";
import Question from "../models/Question";
import QuizTheme from "../models/QuizTheme";
import sequelize from "sequelize";
import QuizHistory from "../models/QuizHistory";
import User from "../models/User";
import QuizRecap from "../models/QuizRecap";

@JsonController("/quizzes")
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

    @Post("/:id/attempt")
    async createHistory(
        @Param("id") id: number,
        @Body() answers: QuizHistory["answers"],
        @CurrentUser() current: User)
    {
        const quiz = await Quiz.findByPk(id);
        return await QuizHistory.create({
            quizId: quiz.id,
            userId: current.id,
            answers: answers
        });
    }

    @Get("/:id/attempts/:uid")
    async getHistory(
        @Param("id") id: number,
        @Param("uid") uid: number)
    {
        const quiz = await Quiz.findByPk(id);
        return await QuizHistory.findAll({
            where: {
                quizId: quiz.id,
                userId: uid
            }
        });
    }

    @Post("/:id/recaps")
    async createRecap(
        @Param("id") id: number,
        @Body() answers: QuizRecap["answers"],
        @CurrentUser() current: User)
    {
        const quiz = await Quiz.findByPk(id);
        return await QuizRecap.create({
            quizId: quiz.id,
            userId: current.id,
            answers: answers
        });
    }

    @Get("/:id/recaps/:uid")
    async getRecaps(
        @Param("id") id: number,
        @Param("uid") uid: number)
    {
        const quiz = await Quiz.findByPk(id);
        return await QuizRecap.findAll({
            where: {
                quizId: quiz.id,
                userId: uid
            }
        });
    }
}
