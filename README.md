# AstroClub Planetenquiz Scoreboard

Live-Leaderboard zum [AstroClub Planetenquiz](https://github.com/ProfessorEngineergit/AstroClub-Planetenquiz-refined).
Liest die Scores per Firestore-Snapshot und aktualisiert sich ohne Neuladen.

Dieser Ordner ist absichtlich eigenstaendig. Du kannst ihn als Root eines neuen Repos verwenden und separat zu Firebase Hosting deployen.

---

## Ohne Internet?

Dieses Scoreboard braucht zwingend eine Internetverbindung: Es laedt das Firebase-SDK
von `gstatic.com` und haelt eine offene Firestore-Verbindung. Offline ist es nicht
lauffaehig, auch nicht als einzelne Datei — Firebase Auth laesst unter `file://` keine
Anmeldung zu.

Fuer Veranstaltungen ohne Netz gibt es stattdessen die Offline-Version des Quiz. Sie
ist eine einzelne HTML-Datei mit eigenem lokalem Leaderboard (inklusive CSV-Export)
und laeuft per Doppelklick auf jedem Windows-Rechner:

<p align="center">
  <a href="https://github.com/ProfessorEngineergit/AstroClub-Planetenquiz-refined/releases/latest/download/Planetenquiz-Offline.html">
    <img alt="Offline-Version des Quiz herunterladen" src="https://img.shields.io/badge/Offline--Version_des_Quiz-eine_HTML--Datei_·_~540_KB-5eead4?style=for-the-badge&labelColor=090b10&logo=html5&logoColor=5eead4">
  </a>
</p>

Details dazu in der
[README des Quiz-Repos](https://github.com/ProfessorEngineergit/AstroClub-Planetenquiz-refined#offline-version-herunterladen).

---

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
