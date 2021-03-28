import sequelize from "../config/database";
import logger from "../utils/logger";
import { JsonSchemaManager, OpenApi3Strategy } from "@alt3/sequelize-to-json-schemas";

export default class DBService
{
    async start()
    {
        try
        {
            logger.info("Connecting to DB...");
            await sequelize.authenticate();
            await sequelize.sync();
            logger.info("Connected to DB - " + await sequelize.databaseVersion());
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
