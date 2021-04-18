import {
    Authorized,
    BadRequestError,
    Body,
    CurrentUser,
    Get,
    HttpError,
    InternalServerError,
    JsonController,
    Param,
    Patch,
    Post,
    UnauthorizedError
} from "routing-controllers";
import User, { UserRole } from "../models/User";
import AuthService from "../services/AuthService";
import BcryptService from "../services/BcryptService";
import { TDifficulty } from "../utils/types";
import QuizHistory from "../models/QuizHistory";
import QuizRecap from "../models/QuizRecap";
import Question from "../models/Question";
import Quiz from "../models/Quiz";

@JsonController("/auth")
export default class UserController
{
    private static logUser(user: User)
    {
        const token = new AuthService().issue({ id: user.id });

        return { ...user.toJSON(), token };
    }

    @Post("/register")
    async register(@Body() body: { username: string; password: string, password2: string, autonomous: boolean })
    {
        if (body.password === body.password2)
        {
            try
            {
                const user = await User.create({
                    name: body.username,
                    password: body.password,
                    role: body.autonomous ? UserRole.Regular : UserRole.NonAutonomous
                });

                return UserController.logUser(user);
            }
            catch (err)
            {
                console.log(err);
                throw new InternalServerError(err);
            }
        }

        throw new BadRequestError("Les mots de passe ne correspondent pas");
    };

    @Post("/login")
    async login(@Body() query: { username: string; password: string })
    {
        if (query.username && query.password)
        {
            try
            {
                const user = await User
                    .findOne({
                        where: {
                            name: query.username,
                        },
                    });

                if (!user)
                {
                    throw new UnauthorizedError("Utilisateur non trouvé");
                }

                if (new BcryptService().comparePassword(query.password, user.password))
                {
                    return UserController.logUser(user);
                }

                throw new UnauthorizedError("Nom d'utilisateur ou mot de passe incorrect");
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
    }

    @Get("/me")
    async current(@CurrentUser() current: User)
    {
        return current;
    }

    @Patch("/me")
    async update(
        @CurrentUser() current: User,
        @Body() user: UserUpdateQuery)
    {
        if (current.role != UserRole.Admin && user.role)
        {
            throw new UnauthorizedError("Seul un administrateur peut gérer les rôles");
        }

        return await current.update(user);
    }

    @Get("/users")
    //@Authorized(UserRole.Admin)
    async getAll()
    {
        return await User.findAll();
    }

    @Get("/users/:id")
    @Authorized(UserRole.Admin)
    async getOne(
        @CurrentUser() current: User,
        @Param("id") id: number)
    {
        return await User.findByPk(id);
    }

    @Patch("/users/:id")
    @Authorized(UserRole.Admin)
    async updateOne(
        @CurrentUser() current: User,
        @Param("id") id: number,
        @Body() user: UserUpdateQuery)
    {
        return await (await User.findByPk(id)).update(user);
    }

    @Get("/users/:id/attempts")
    async getAttempts(@Param("id") id: number)
    {
        const quizzes = await Quiz.findAll({
            include: {
                model: Question,
                attributes: ["id", "label", "correctAnswer"]
            }
        });
        let quizzesById = [];
        for (const q of quizzes)
        {
            quizzesById[q.id] = q;
        }
        let attempts = {};
        for (let x of await QuizHistory.findAll({ where: { userId: id } }))
        {
            const quiz = quizzesById[x.quizId];
            for (const [q, a] of Object.entries(x.answers))
            {
                const qo = quiz.questions[+q];
                if (!(qo.id in attempts))
                {
                    attempts[qo.id] = {
                        id: qo.id,
                        name: qo.label,
                        image: qo.image,
                        stats: { correct: 0, total: 0 },
                        recap: { correct: 0, total: 0 }
                    };
                }
                attempts[qo.id].stats.total++;
                attempts[qo.id].stats.correct += (a == qo.correctAnswer);
            }
        }
        for (let x of await QuizRecap.findAll({ where: { userId: id } }))
        {
            const quiz = quizzesById[x.quizId];
            for (const [q, a] of Object.entries(x.answers))
            {
                const qo = quiz.questions[+q];

                attempts[qo.id].recap.total++;
                attempts[qo.id].recap.correct += a;
            }
        }
        return Object.values(attempts);
    }
}

interface UserUpdateQuery
{
    password?: string,
    highContrast?: boolean,
    fontSize?: number,
    font?: string,
    role?: UserRole,
    maxDifficulty?: TDifficulty;
    maxQuestions?: number;
    ignoredQuestions?: number[];
}
