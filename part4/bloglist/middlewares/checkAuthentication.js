const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try 
    {
        const token = req.headers.authorization.split(' ')[1]; // Bearer + token
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.userData = { username: decodedToken.username, userId: decodedToken.userId };
        next();
    }
    catch (error) 
    {
        res.status(401).json({
            message: 'You are not authenticated'
        });
    }
}