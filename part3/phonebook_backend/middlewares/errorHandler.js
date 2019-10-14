const errorHandler = (error, req, res, next) => {

    if(error) {
        res.status(error.status).json({
            message: error.message,
            error: error.error
        });
    }

    // When I use this one, it logs [object Object] even though there is no console log in my code
    //
    // next(error);

    next();
}

module.exports = errorHandler;