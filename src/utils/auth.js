import jwt from 'jsonwebtoken';

const signToken = (account) => {
    return jwt.sign({
        _id: account._id,
        username: account.username,
        isAdmin: account.isAdmin
    }, process.env.JWT_SECRET, {expiresIn: '30d'})
}

const isAuth = async (req, res, next) => {
    const {authorization} = req.headers;
    if(authorization){
        // Bearer xxx
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if(err) {
                res.status(401).send({message: 'Token is not valid'})
            } else {
                req.account = decode;
                next()
            }
        })
    } else {
        res.status(401).send({message: 'Token is not supplied'})
    }
}

export {signToken, isAuth};