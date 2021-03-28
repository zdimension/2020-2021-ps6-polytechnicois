import {
    BadRequestError, Body,
    Controller,
    Get,
    HeaderParam, HttpError,
    InternalServerError,
    Post,
    UnauthorizedError
} from "routing-controllers";
import User from "../models/User";
import AuthService from "../services/AuthService";
import BcryptService from "../services/BcryptService";

@Controller("/auth")
export default class UserController
{
    /*async register()
    {
        const { body } = req;

        if (body.password === body.password2)
        {
            try
            {
                const user = await User.create({
                    name: body.name,
                    password: body.password,
                });
                const token = new AuthService().issue({ id: user.id });

                return res.status(200).json({ token, user });
            }
            catch (err)
            {
                console.log(err);
                return res.status(500).json({ msg: "Internal server error" });
            }
        }

        return res.status(400).json({ msg: "Bad Request: Passwords don't match" });
    };

    async login()
    {
        const { name, password } = req.body;

        if (name && password)
        {
            try
            {
                const user = await User
                    .findOne({
                        where: {
                            name,
                        },
                    });

                if (!user)
                {
                    return res.status(400).json({ msg: "Bad Request: User not found" });
                }

                if (new BcryptService().comparePassword(password, user.password))
                {
                    const token = new AuthService().issue({ id: user.id });

                    return res.status(200).json({ token, user });
                }

                return res.status(401).json({ msg: "Unauthorized" });
            }
            catch (err)
            {
                console.log(err);
                return res.status(500).json({ msg: "Internal server error" });
            }
        }

        return res.status(400).json({ msg: "Bad Request: Email or password is wrong" });
    };

    async validate()
    {
        const { token } = req.body;

        new AuthService().verify(token, (err) =>
        {
            if (err)
            {
                return res.status(401).json({ isvalid: false, err: "Invalid Token!" });
            }

            return res.status(200).json({ isvalid: true });
        });
    };*/

    @Post("/login")
    async login(@Body() user: { name: string; password: string })
    {
        const { name, password } = user;

        if (name && password)
        {
            try
            {
                const user = await User
                    .findOne({
                        where: {
                            name,
                        },
                    });

                if (!user)
                {
                    throw new BadRequestError("User not found");
                }

                if (new BcryptService().comparePassword(password, user.password))
                {
                    const token = new AuthService().issue({ id: user.id });

                    return { token, user };
                }

                throw new UnauthorizedError();
            }
            catch (err)
            {
                if (err instanceof HttpError)
                    throw err;
                else
                {
                    console.log(err);
                    throw new InternalServerError(err);
                }
            }
        }

        throw new BadRequestError("Username or password is wrong");
    }

    @Post("/validate")
    async validate(@HeaderParam("authorization") token: string)
    {
        try
        {
            new AuthService().verify(token);
            return { isvalid: true };
        }
        catch (err)
        {
            throw new UnauthorizedError("Invalid Token!");
        }
    }

    @Get("/users")
    async getAll()
    {
        return await User.findAll();
    }
}
