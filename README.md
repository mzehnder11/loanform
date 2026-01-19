# Ausleihformular

Dies ist eine webbasierte Anwendung zur Verwaltung von Materialausleihen. Sie ermöglicht es Benutzern, Ausleihformulare auszufüllen, und bietet Administratoren eine Oberfläche zur Verwaltung dieser Einträge.

## Funktionen

- Benutzerformular zur Erfassung von Ausleihen (Name, Klasse, Gerät, Zeitdauer).
- Administrationsbereich zum Einsehen aller aktuellen Ausleihen.
- Statusverwaltung (Zurückgegeben markieren).
- Bearbeitungsfunktion für bestehende Einträge im Administrationsbereich.
- Passwortgeschützter Zugriff auf die administrativen Funktionen via Token-System.
- Lokale Datenspeicherung in JSON-Dateien.
- Automatisches Aufräumen alter Einträge.

## Voraussetzungen

- **Node.js**: Version 14.x oder höher empfohlen.
- **npm**: Node Package Manager.

## Installation

1. Navigieren Sie in das Projektverzeichnis.
2. Der Server prüft beim Start automatisch, ob alle Abhängigkeiten (`express`, `body-parser`) installiert sind, und installiert diese bei Bedarf selbstständig. Alternativ können Sie diese manuell installieren mit:
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
4. **Wichtig:** Aus Sicherheitsgründen die `setup_password.js` danach löschen, da sie das Passwort im Klartext enthalten könnte.

## Starten der Anwendung

Starten Sie den Server mit folgendem Befehl:
```bash
npm start
```

Der Server läuft standardmässig auf Port 3000. Sie können die Anwendung unter folgender Adresse aufrufen:
- Benutzerformular: `http://localhost:3000/index.html`
- Administration: `http://localhost:3000/admin.html`

### Aufräumen alter Rückgaben
Der Server führt beim Start und vor jeder Admin-Abfrage automatisch einen Cleanup-Job aus. Dabei werden alle Einträge, die bereits als **zurückgegeben** markiert sind und deren Rückgabedatum **älter als 30 Tage** ist, unwiderruflich aus der `data.json` gelöscht.

## API-Endpunkte

Die Kommunikation zwischen Frontend und Backend erfolgt über folgende Endpunkte:

- **POST `/api/loans`**: Erstellt eine neue Ausleih-Anfrage.
- **POST `/api/admin/loans`**: Login für Administratoren (erfordert Passwort). Gibt bei Erfolg einen Session-Token und die Liste aller Leihvorgänge zurück.
- **POST `/api/admin/verify`**: Validiert einen bestehenden Token und liefert aktuelle Daten.
- **POST `/api/admin/update`**: Aktualisiert die Daten eines bestehenden Eintrags (erfordert gültigen Token).
- **POST `/api/admin/return`**: Markiert ein Gerät als zurückgegeben oder macht dies rückgängig (erfordert gültigen Token).

## Technik & Sicherheit

### Authentifizierung
Das System nutzt ein Token-basiertes Verfahren. Nach dem Login wird ein SHA-256-Hash als Token generiert (basierend auf dem Passwort-Hash und einem internen Secret). Dieser Token muss bei allen administrativen Anfragen im Body mitgesendet werden.

### Datenpersistenz
- **`data.json`**: Speichert alle aktiven und kürzlich abgeschlossenen Ausleihen.
- **`admin.json`**: Enthält lediglich den SHA-256-Hash des Administrator-Passworts. Es werden keine Passwörter im Klartext gespeichert.

### Limits
Die API akzeptiert Payloads bis zu einer Größe von **5 MB**. Dies ist ausreichend für umfangreiche Listen, sollte jedoch bei etwaigen Erweiterungen (z.B. Bilduploads) beachtet werden.

## Projektstruktur

- `server.js`: Der Node.js/Express Server inklusive automatischer Dependency-Prüfung und Cleanup-Logik.
- `public/`: Enthält die Frontend-Dateien (HTML, CSS, JavaScript).
- `data.json`: Datenbank-Ersatz für die Ausleihvorgänge.
- `admin.json`: Konfigurationsdatei für den Admin-Zugang.
- `setup_password.js`: Hilfsskript zur Ersteinrichtung.
