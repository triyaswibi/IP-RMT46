module.exports = (error, req, res, next) => {
    let status = error.status || 500;
    let message = error.message || "Internal server error";

    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
        case "CustomError":
            status = 400;
            message = error.errors[0].message;
            break;
        case "Unauthenticated":
        case "JsonWebTokenError":
            status = 401;
            message = "Unauthenticated";
            break;
        case "Unauthorized":
        case "forbiden access":
            status = 403;
            message = "Forbidden access";
            break;
        case "NotFound":
            status = 404;
            message = "Data not found";
            break;
    }

    res
        .status(status)
        .json({
            message: message,
        });
}