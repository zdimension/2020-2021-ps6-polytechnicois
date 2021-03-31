import morgan from "morgan";
import logger from "./utils/logger";
import { Action, createExpressServer, getMetadataArgsStorage } from "routing-controllers";
import DBService from "./services/DBService";
import AuthService from "./services/AuthService";
import User, { UserRole } from "./models/User";
import { routingControllersToSpec } from "routing-controllers-openapi";
import * as fs from "fs";
import swaggerUi from "swagger-ui-express";

const auth = new AuthService();
const app = createExpressServer({
    cors: true,
    controllers: [__dirname + "/controllers/*.ts"],
    interceptors: [__dirname + "/interceptors/*.ts"],
    authorizationChecker: async (action: Action, roles: UserRole[]) =>
    {
        try
        {
            const user = await User.findByPk(auth.verify(action.request.headers["authorization"]).id);
            return roles.includes(user.role);
        }
        catch (err)
        {
            return false;
        }
    },
    currentUserChecker: async (action: Action) =>
    {
        try
        {
            return await User.findByPk(auth.verify(action.request.headers["authorization"]).id);
        }
        catch (err)
        {
            return null;
        }
    },
    defaults: {
        paramOptions: {
            required: true
        }
    }
});

const DB = new DBService();

const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage);
spec.components.schemas = DB.getSequelizeSchema();
fs.writeFileSync("swagger.json", JSON.stringify(spec));
app.disable("x-powered-by");
app.get("/", function (req, res)
{
    res.redirect("/docs");
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(require("../swagger.json")));
app.use(morgan("[:date[iso]] :method :url :status :response-time ms - :res[content-length]"));
DB.start().then(() =>
{
    const server = app.listen(process.env.PORT || 9428, () =>
    {
        logger.info(`Server is listening on port ${server.address().port}`);
    });
});
