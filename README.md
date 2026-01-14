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
2. Der Server prüft beim Start automatisch, ob alle Abhängigkeiten installiert sind, und installiert diese bei Bedarf selbstständig. Alternativ können Sie diese manuell installieren mit:
   ```bash
   npm install
   ```

## Konfiguration

Das Administrator-Passwort kann direkt über die Weboberfläche festgelegt werden.

1. Starten Sie den Server (siehe unten).
2. Öffnen Sie das Admin-Portal (`http://localhost:3000/admin.html`).
3. Falls noch kein Passwort gesetzt wurde, erscheint automatisch eine Setup-Maske, in der Sie das Passwort festlegen können.

Alternativ kann das Passwort weiterhin manuell über das Hilfsskript `setup_password.js` gesetzt werden (beachten Sie die Kommentare in der Datei).

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
- `data.json`: Speichert die Daten der getätigten Ausleihen.
- `admin.json`: Speichert das Such-Hash des Administrator-Passworts.
- `setup_password.js`: Hilfsskript zum Setzen des Admin-Passworts.
