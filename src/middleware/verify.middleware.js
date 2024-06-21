import jwt from 'jsonwebtoken';
import {UserIdentityService} from '../service';
import env from 'haduckien'
env.config();

export default function verify(req, res, next) {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    token = token.split(' ')[1];
    try {
        const userIdentityService = new UserIdentityService();
        const decoded = userIdentityService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
}