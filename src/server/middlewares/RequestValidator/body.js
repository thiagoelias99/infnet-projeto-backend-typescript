const { Student, Course, Login } = require("./models");

const body = (req, res, next) => {
    const { url, body } = req

    const schema = getSchemaFromUrl(url);
    const { error } = schema.validate(body);
    if (error) {
        next(error);
    }
    next();
};

function getSchemaFromUrl(url) {
    if (url.startsWith("/students")) { return Student };
    if (url.startsWith("/courses")) { return Course };
    if (url.startsWith("/login")) { return Login };
};

module.exports = body;