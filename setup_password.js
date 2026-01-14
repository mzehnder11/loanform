const fs = require('fs');
const crypto = require('crypto');

// Hier das eigene Passwort, welches man festlegen möchte eintragen und dann dieses script mit Node ausführen.
const password = 'Eigenes_Passwort';
const hash = crypto.createHash('sha256').update(password).digest('hex');

const config = {
    passwordHash: hash
};

fs.writeFileSync('admin.json', JSON.stringify(config, null, 2));
console.log('Admin password hashed and saved to admin.json');
