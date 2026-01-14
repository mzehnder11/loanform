# Ausleihformular

Dies ist eine webbasierte Anwendung zur Verwaltung von Materialausleihen. Sie ermöglicht es Benutzern, Ausleihformulare auszufüllen, und bietet Administratoren eine Oberfläche zur Verwaltung dieser Einträge.

## Funktionen

- Benutzerformular zur Erfassung von Ausleihen (Name, Klasse, Gerät, Zeitdauer).
- Administrationsbereich zum Einsehen aller aktuellen Ausleihen.
- Statusverwaltung (Zurückgegeben markieren).
- Bearbeitungsfunktion für bestehende Einträge im Administrationsbereich.
- Passwortgeschützter Zugriff auf die administrativen Funktionen.
- Lokale Datenspeicherung in JSON-Dateien.

## Voraussetzungen

- Node.js installiert auf dem System.
- npm (Node Package Manager).

## Installation

1. Navigieren Sie in das Projektverzeichnis.
2. Installieren Sie die benötigten Abhängigkeiten mit dem Befehl:
   ```bash
   npm install
   ```

## Konfiguration

Bevor die Anwendung genutzt werden kann, muss das Administrator-Passwort konfiguriert werden.

1. Öffnen Sie die Datei `setup_password.js`.
2. Ändern Sie bei Bedarf das Passwort in Zeile 4.
3. Führen Sie das Skript aus, um die `admin.json` zu erstellen:
   ```bash
   node setup_password.js
   ```
4. Aus Sicherheitsgründen die `setup_password.js` danach löschen.

## Starten der Anwendung

Starten Sie den Server mit folgendem Befehl:
```bash
npm start
```

Der Server läuft standardmässig auf Port 3000. Sie können die Anwendung unter folgender Adresse aufrufen:
- Benutzerformular: `http://localhost:3000/index.html`
- Administration: `http://localhost:3000/admin.html`

## Projektstruktur

- `server.js`: Der Node.js/Express Server, der die API-Endpunkte bereitstellt.
- `public/`: Enthält die Frontend-Dateien (HTML, CSS, JavaScript).
- `loans.json`: Speichert die Daten der getätigten Ausleihen.
- `admin.json`: Speichert das Such-Hash des Administrator-Passworts.
- `setup_password.js`: Hilfsskript zum Setzen des Admin-Passworts.
