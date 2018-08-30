const crypto = require('crypto');

function generateSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function generateHash(salt, password) {
    const hmac = crypto.createHmac('sha1', salt);
    return hmac.update(password).digest('hex');
}

const salt = 'gxilSfCIO6VtWtDjp0wOJIYaD7tttDTbWTSzw6NoEkouu+U6ahhor8mBz54UqZeQtCXFH0q8IO2gRh+uzbMI/7hmJ7poI2SFF3T8gpBak2YaJWiPjZGPPDnbSIb0pcPH0AFi4a03YNkFGz7OyD1RigYDLsLV1LaJ5mBW8spuEt8=';
const password = 'pesho1';

const hashPassword = generateHash(salt, password);

console.log(hashPassword);