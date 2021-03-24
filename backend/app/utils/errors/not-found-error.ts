import util from "util";

function NotFoundError(message)
{
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
}

util.inherits(NotFoundError, Error);

module.exports = NotFoundError;
