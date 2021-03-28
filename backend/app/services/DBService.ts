import sequelize from "../config/database";
import logger from "../utils/logger";
import { JsonSchemaManager, OpenApi3Strategy } from "@alt3/sequelize-to-json-schemas";
import User from "../models/User";

export default class DBService
{
    private static async insertSampleData()
    {
        logger.info("Inserting sample data...");
        await User.bulkCreate([
            { name: "admin", password: "polyquiz" }
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
