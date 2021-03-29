import sequelize from "../config/database";
import logger from "../utils/logger";
import { JsonSchemaManager, OpenApi3Strategy } from "@alt3/sequelize-to-json-schemas";
import User from "../models/User";
import Quiz from "../models/Quiz";
import QuizTheme from "../models/QuizTheme";
import Question from "../models/Question";

export default class DBService
{
    private static async insertSampleData()
    {
        logger.info("Inserting sample data...");

        await User.bulkCreate([
            { name: "admin", password: "polyquiz" }
        ]);

        const themes = await QuizTheme.bulkCreate([
            { name: "Histoire" }
        ]);

        await Quiz.bulkCreate([
            {
                name: "Les rois de France",
                difficulty: 3,
                themeId: themes[0].id,
                questions: [
                    {
                        label: "Qui était le roi Soleil ?",
                        difficulty: 3,
                        answers: [
                            "François 1er",
                            "Louis XIV",
                            "Benoît XVI",
                            "Ségolène Royale"
                        ],
                        correctAnswer: 1
                    },
                    {
                        label: "Qui est-ce ?",
                        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/P%C3%A9tain_-_Portrait_photographique_1941.jpg/220px-P%C3%A9tain_-_Portrait_photographique_1941.jpg",
                        difficulty: 3,
                        answers: [
                            "Philippe Pétain",
                            "George Brassens",
                            "Charles de Gaulle",
                            "Adolf Hitler"
                        ]
                    }
                ]
            }
        ], { include: { model: Question, as: "questions" } });
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
