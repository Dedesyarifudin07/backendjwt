const jwt = require('jsonwebtoken');


const verifyToken = (req,res,next) => {
    const token = req.header("auth-token");
    if(!token) {
        return res.status(404).json({
            message:'invalid token',
            status:res.statusCode
        })
    }
    try {
        const verifie = jwt.verify(token,process.env.SECRET_KEY);
        req.user = verifie;
        next()
    } catch (error) {
        return res.status(404).json({
            message:'acces denied',
            status:res.statusCode
        })
    }

    
}


module.exports = verifyToken;