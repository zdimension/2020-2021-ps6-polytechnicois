import { Body, Controller, Get, Post } from "routing-controllers";
import Quiz from "../models/Quiz";

@Controller()
export default class QuizController
{
    @Get("/quizzes")
    async getAll()
    {
        return await Quiz.findAll();
    }

    @Post("/quizzes")
    async create(@Body() quiz: Quiz)
    {
    }
}
