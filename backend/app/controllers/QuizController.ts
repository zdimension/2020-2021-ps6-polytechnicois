import { Body, Controller, Get, Param, Post } from "routing-controllers";
import Quiz from "../models/Quiz";

@Controller("/quizzes")
export default class QuizController
{
    @Get("/")
    async getAll()
    {
        return await Quiz.findAll();
    }

    @Get("/:id")
    async getOne(@Param("id") id: number)
    {
        return await Quiz.findByPk(id);
    }

    @Post("/")
    async create(@Body() quiz: Quiz)
    {
    }
}
