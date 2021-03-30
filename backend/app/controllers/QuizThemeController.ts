import { Controller, Get, OnNull, Param } from "routing-controllers";
import QuizTheme from "../models/QuizTheme";

@Controller("/themes")
export default class QuizThemeController
{
    @Get("/")
    async getAll(): Promise<QuizTheme[]>
    {
        return await QuizTheme.findAll();
    }

    @Get("/:id")
    @OnNull(404)
    async getOne(@Param("id") id: number): Promise<QuizTheme | null>
    {
        return await QuizTheme.findByPk(id);
    }
}
