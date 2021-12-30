const jwt = require('jsonwebtoken');

const jwtVeify = (req, res, next)=>{

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // const token = req.body.token
    if(!token) return res.status(401).send("access denied")
    // console.log(token);
    try {
        const verified = jwt.verify(token,process.env.JWT_SECRET)
        req.user = verified
    } catch (error) {
        res.status(400).send('Invalid Token Kindly Try with Valid Token')
        console.log(error);
    }
    next();
}



module.exports = jwtVeify