import sequelize from "../config/database";
import logger from "../utils/logger";
import { JsonSchemaManager, OpenApi3Strategy } from "@alt3/sequelize-to-json-schemas";
import User, { UserRole } from "../models/User";
import Quiz from "../models/Quiz";
import QuizTheme from "../models/QuizTheme";
import Question from "../models/Question";
import * as fs from "fs";

export default class DBService
{
    private static async insertSampleData()
    {
        logger.info("Inserting sample data...");

        await User.bulkCreate([
            { name: "admin", password: "123", role: UserRole.Admin },
            { name: "Pierre", password: "123", role: UserRole.NonAutonomous },
            { name: "Germaine", password: "123", role: UserRole.Regular },
        ]);

        const themes = await QuizTheme.bulkCreate([
            { name: "Histoire" },
            { name: "Musique" }
        ]);

        await Quiz.bulkCreate(JSON.parse(await fs.promises.readFile("sample.json", "utf-8")),
            { include: { model: Question, as: "questions" } });
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
