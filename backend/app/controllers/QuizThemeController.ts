import { Authorized, Body, Controller, Get, HttpCode, JsonController, OnNull, Param, Post } from "routing-controllers";
import QuizTheme from "../models/QuizTheme";
import { UserRole } from "../models/User";

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
    @Authorized(UserRole.Admin)
    async create(@Body() theme : { name: string }): Promise<QuizTheme>
    {
        const existing = await QuizTheme.findOne({
            where: { name: theme.name }
        });
        return existing || await QuizTheme.create({ name: theme.name });
    }
}
