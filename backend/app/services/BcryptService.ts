import bcrypt from "bcrypt-nodejs";

export default class BcryptService
{
    password(pw)
    {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(pw, salt);
    };

    comparePassword(pw, hash)
    {
        return bcrypt.compareSync(pw, hash);
    };
};
