const jwt = require('jsonwebtoken');
const key="Assign&$98989"
const verifyToken = (req, res, next) => {
    var token = req.body.token;
    if (token) {
        jwt.verify(token, key, function (err, ress) {
            if (err) {
                res.send({ message: "Session Expired!", sessionExpire:true });
            } else {
                next()
            }
        })
    }
}

const GenerateAuthToken = (obj) => {
    return jwt.sign(obj, key, {algorithm: "HS256", expiresIn:'10m' });
}

module.exports={verifyToken,GenerateAuthToken}
