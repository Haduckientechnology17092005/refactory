import crypto from 'crypto';
function hashPassword(plainText){
    const salt = crypto.randomBytes(32).toString('hex');
    const hashObject = crypto.createHash('sha256');
    const passwordHashed = hashObject.update(plainText + salt).digest('hex');
    return {
        salt,
        passwordHashed
    }
}
function hashPasswordSalt(plainText, salt){
    const hashObject = crypto.createHash('sha256');
    const passwordHashed = hashObject.update(plainText + salt).digest('hex');
    return passwordHashed;
}
export default {
    hashPassword,
    hashPasswordSalt
};