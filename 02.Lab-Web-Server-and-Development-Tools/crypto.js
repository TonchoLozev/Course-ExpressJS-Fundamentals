const crypto = require('crypto');

function generateSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function generateHash(salt, password) {
    let hmac = crypto.createHmac('sha1', salt);
    return hmac.update(password).digest('hex');
}

const salt = generateSalt();
const password = 'pesho11';

const hashedPassword = generateHash(salt, password);
console.log(hashedPassword);