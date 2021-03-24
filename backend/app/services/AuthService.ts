import jwt from "jsonwebtoken";

const secret = process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "secret";

export default class AuthService
{
    issue(payload)
    {
        return jwt.sign(payload, secret, { expiresIn: 10800 });
    }

    verify(token)
    {
        return jwt.verify(token, secret);
    }
}
