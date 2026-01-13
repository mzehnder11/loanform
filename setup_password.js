const fs = require('fs');
const crypto = require('crypto');

const password = '1Qay2Wsx';
const hash = crypto.createHash('sha256').update(password).digest('hex');

const config = {
    passwordHash: hash
};

fs.writeFileSync('admin.json', JSON.stringify(config, null, 2));
console.log('Admin password hashed and saved to admin.json');
