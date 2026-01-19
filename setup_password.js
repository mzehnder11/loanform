const fs = require('fs');
const crypto = require('crypto');

// Hier das eigene Passwort, welches man festlegen möchte eintragen und dann dieses script mit Node ausführen.
const password = 'Eigenes_Passwort';
const hash = crypto.createHash('sha256').update(password).digest('hex');

const config = {
    passwordHash: hash
};

try { // Added try block
    fs.writeFileSync(path.join(__dirname, 'admin.json'), JSON.stringify(config, null, 2)); // Modified fs.writeFileSync
    console.log('Passwort erfolgreich gesetzt und admin.json erstellt.'); // Modified console.log message
    console.log('--- WICHTIG: Löschen Sie nun diese Datei (setup_password.js) aus Sicherheitsgründen! ---'); // Added new console.log
} catch (err) { // Added catch block
    console.error('Fehler beim Schreiben der admin.json Datei:', err);
}
