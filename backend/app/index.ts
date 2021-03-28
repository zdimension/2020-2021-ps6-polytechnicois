import morgan from "morgan";
import logger from "./utils/logger";
import { Action, createExpressServer } from "routing-controllers";
import DBService from "./services/DBService";
import bodyParser from "body-parser";
import AuthService from "./services/AuthService";
import User from "./models/User";

const auth = new AuthService();
const app = createExpressServer({
    cors: true,
    controllers: [__dirname + "/controllers/*.ts"],
    authorizationChecker: async (action: Action, roles: string[]) =>
    {
        try
        {
            const { id } = auth.verify(action.request.headers["authorization"]);
            const user = User.findByPk(id);
            return true;
        }
        catch (err)
        {
            return false;
        }
    }
});

const DB = new DBService();

app.disable("x-powered-by");
app.use(bodyParser.json({}));
app.use(morgan("[:date[iso]] :method :url :status :response-time ms - :res[content-length]"));
DB.start().then(() =>
{
    const server = app.listen(process.env.PORT || 9428, () =>
    {
        logger.info(`Server is listening on port ${server.address().port}`);
    });
});
