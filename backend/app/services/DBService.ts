import sequelize from "../config/database";
import logger from "../utils/logger";
import { JsonSchemaManager, OpenApi3Strategy } from "@alt3/sequelize-to-json-schemas";
import User, { UserRole } from "../models/User";
import Quiz from "../models/Quiz";
import QuizTheme from "../models/QuizTheme";
import Question from "../models/Question";
import QuizHistory from "../models/QuizHistory";
import * as fs from "fs";
import QuizRecap from "../models/QuizRecap";

export default class DBService
{
    private static async insertSampleData()
    {
        logger.info("Inserting sample data...");

        await User.bulkCreate([
            { name: "isabelle", password: "123az", role: UserRole.Admin },
            { name: "pierre", password: "123az", role: UserRole.NonAutonomous, forceRecap: true },
            { name: "germaine", password: "123az", role: UserRole.Regular },
        ]);

        const themes = await QuizTheme.bulkCreate([
            { name: "Histoire" },
            { name: "Musique" },
            { name: "Pop culture" }
        ]);

        await Quiz.bulkCreate(JSON.parse(await fs.promises.readFile("sample.json", "utf-8")),
            { include: { model: Question, as: "questions" } });

        await QuizHistory.bulkCreate([
            {quizId: 1, userId:2, answers: {0:1, 1:0}, createdAt:"2020-12-17 15:03:23.275 +00:00"},
            {quizId: 1, userId:2, answers: {0:1, 1:0}, createdAt:"2021-01-17 12:03:23.275 +00:00"},
            {quizId: 1, userId:2, answers: {0:2, 1:3}, createdAt:"2021-03-17 9:28:23.275 +00:00"},
            {quizId: 1, userId:2, answers: {0:2, 1:0}, createdAt:"2021-04-17 15:03:23.275 +00:00"}
        ]);

        await QuizRecap.bulkCreate([
            {quizId: 1, userId:2, answers: {0:true, 1:true}, createdAt:"2020-12-17 15:03:23.275 +00:00"},
            {quizId: 1, userId:2, answers: {0:true, 1:true}, createdAt:"2021-01-17 12:03:23.275 +00:00"},
            {quizId: 1, userId:2, answers: {0:false, 1:true}, createdAt:"2021-03-17 9:28:23.275 +00:00"},
            {quizId: 1, userId:2, answers: {0:false, 1:true}, createdAt:"2021-04-17 15:03:23.275 +00:00"}
        ]);
    }

    async start()
    {
        try
        {
            logger.info("Connecting to DB...");
            await sequelize.authenticate();
            await sequelize.sync({ force: true });

            logger.info("Connected to DB - " + await sequelize.databaseVersion());

            await DBService.insertSampleData();
        }
        catch (err)
        {
            logger.error("Unable to connect to DB: ", err);
        }
    }

    getSequelizeSchema()
    {
        const schemaManager = new JsonSchemaManager();
        const strat = new OpenApi3Strategy();
        const res = {};
        for (const mod in sequelize.models)
        {
            res[mod] = schemaManager.generate(sequelize.models[mod], strat);
        }
        return res;
    }
}
