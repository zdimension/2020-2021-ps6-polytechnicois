import sequelize from "../config/database";
import logger from "../utils/logger";

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
}
