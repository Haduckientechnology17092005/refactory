import jwt from 'jsonwebtoken';

function signJwt(user, roles){
    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret){
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            roles: roles
        }, 
        jwtSecret,

        {
            expiresIn: '24h',
            algorithm: 'HS256'
        }
    )
}
export {signJwt}
class UserIdentityService{
    constructor(){
        this.user = null;
        this.JWT_SECRET = process.env.JWT_SECRET;
    }
    async sign(user){
        this.user = user;
        return jwt.sign({id:user.id}, this.JWT_SECRET, {expiresIn: '24h', algorithm: 'HS256'});
    }

    verifyToken(token){
        return jwt.verify(token, this.JWT_SECRET);
    }
    assignUserRequestContext(user, req){
        req.user = user;
    }
}

export default UserIdentityService;