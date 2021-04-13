import { Body, Get, HttpCode, JsonController, OnNull, Param, Patch, Post } from "routing-controllers";
import QuizTheme from "../models/QuizTheme";

@JsonController("/themes")
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

    @Post("/")
    @HttpCode(201)
    async create(@Body() theme: { name: string }): Promise<QuizTheme>
    {
        const existing = await QuizTheme.findOne({
            where: { name: theme.name }
        });
        return existing || await QuizTheme.create({ name: theme.name });
    }

    @Patch("/:id")
    async update(@Param("id") id: number, @Body() theme: { name: string }): Promise<QuizTheme>
    {
        const existing = await this.getOne(id);
        return existing.update({ name: theme.name });
    }
}
