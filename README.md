# AstroClub Planetenquiz Scoreboard

Eigenständige Scoreboard-Webseite für das AstroClub-Planetenquiz. Die Ergebnisse werden über Firebase/Firestore zwischen Geräten geteilt. Dieses Repository kann separat zu Firebase Hosting deployt werden.

## Firebase eintragen

1. Firebase Console -> Project settings -> General -> Your apps -> Web app.
2. Den `firebaseConfig`-Block in `firebase-config.js` eintragen.
3. In `firebase-config.js` `enabled: true` setzen.
4. Firestore -> Rules: Inhalt aus `firestore.rules` einfuegen und veroeffentlichen.
5. Authentication -> Sign-in method -> Anonymous aktivieren.

## Lokal testen

```bash
python3 -m http.server 8080
```

Dann im Browser `http://localhost:8080` oeffnen.

## Als neues Repo pushen

Aus dem Hauptprojekt heraus:

```bash
cd scoreboard
git init
git add .
git commit -m "Initial AstroClub scoreboard"
git branch -M main
git remote add origin https://github.com/DEIN-NAME/DEIN-REPO.git
git push -u origin main
```

## Firebase Hosting deployen

```bash
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy
```

## Entwicklung und KI-Beteiligung

Kleines, KI-gestützt entwickeltes Lern- oder Experimentierprojekt. Die Historie des Hauptbranches enthält ausdrücklich Claude zugeschriebene Beiträge ([Beispiel](https://github.com/ProfessorEngineergit/AstroClub-Planetenquiz--Scoreboard/commit/fbe87f07384e2adcb09a4912c53771d8eef1615a)). Das belegt KI-Beteiligung an diesen Beiträgen, nicht die Herkunft jeder Zeile oder eine unabhängige Prüfung. Bestehende Autor-, Co-Autoren- und Sitzungsangaben bleiben erhalten.
