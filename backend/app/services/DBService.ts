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
            { name: "isabelle", password: "123az", role: UserRole.Admin },
            { name: "pierre", password: "123az", role: UserRole.NonAutonomous },
            { name: "germaine", password: "123az", role: UserRole.Regular },
        ]);

        const themes = await QuizTheme.bulkCreate([
            { name: "Histoire" },
            { name: "Musique" },
            { name: "Pop culture" }
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
