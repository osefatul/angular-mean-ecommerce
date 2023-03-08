function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        console.log(err)
        return res.status(401).json({message: "The user is not authorized"})
    }

    if (err.name === 'ValidationError') {
        //  validation error
        console.log(err)
        return res.status(401).json({message: err})
    }

    // default to 500 server error
    console.log(err)
    return res.status(500).json(err);
    
}

module.exports = errorHandler;