const jwt = require("jsonwebtoken")

module.exports = (req,res,next) => {
    const accessToken = req.headers['x-access-token']
    if (accessToken) {
        try{
            let decode = jwt.verify(accessToken,'SECRET_KEY');
            req.accessTokenPayload = decode
            next();
        }
        catch(err){
            console.log(err);
            return res.status(400).json({
                message: "Invalid access token"
            })
        }
    }
    else {
        return res.status(400).json({
            message: 'Access token is not found'
        })
    }
}