const FIREBASE_SDK_VERSION = '10.12.0';
const scoreList = document.getElementById('scoreList');
const emptyState = document.getElementById('emptyState');
const statusEl = document.getElementById('status');

loadScores().catch(error => {
    console.error(error);
    setStatus('Firebase konfigurieren', 'error');
    emptyState.hidden = false;
    emptyState.textContent = 'Trage deine Firebase-Web-App-Konfiguration in firebase-config.js ein.';
});

async function loadScores() {
    const configModule = await import('./firebase-config.js');
    const firebaseConfig = configModule.firebaseConfig;
    const options = configModule.scoreboardOptions || {};

    if (!options.enabled || !hasRealConfig(firebaseConfig)) {
        throw new Error('firebase-not-configured');
    }

    const [{ initializeApp }, firestoreModule] = await Promise.all([
        import(`https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-app.js`),
        import(`https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-firestore.js`)
    ]);

    const app = initializeApp(firebaseConfig);
    const db = firestoreModule.getFirestore(app);
    const scoresQuery = firestoreModule.query(
        firestoreModule.collection(db, options.collectionName || 'scores'),
        firestoreModule.orderBy('score', 'desc'),
        firestoreModule.limit(options.topLimit || 50)
    );

    firestoreModule.onSnapshot(scoresQuery, snapshot => {
        const scores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderScores(scores);
        setStatus('Live', 'live');
    }, error => {
        console.error(error);
        setStatus('Fehler', 'error');
        emptyState.hidden = false;
        emptyState.textContent = 'Firestore-Regeln oder Firebase-Konfiguration prüfen.';
    });
}

function renderScores(scores) {
    scoreList.innerHTML = '';
    emptyState.hidden = scores.length > 0;
    emptyState.textContent = 'Noch keine Scores.';

    scores.forEach(score => {
        const item = document.createElement('li');
        item.className = 'score-item';

        const name = document.createElement('div');
        name.className = 'score-name';

        const nameText = document.createElement('strong');
        nameText.textContent = score.name || 'Gast';

        const meta = document.createElement('span');
        meta.textContent = formatMeta(score);

        const points = document.createElement('div');
        points.className = 'score-points';
        points.textContent = `${Number(score.score || 0)} P`;

        name.append(nameText, meta);
        item.append(name, points);
        scoreList.appendChild(item);
    });
}

function formatMeta(score) {
    const language = score.lang === 'en' ? 'EN' : 'DE';
    const date = score.createdAt?.toDate ? score.createdAt.toDate() : null;
    if (!date) return language;

    return `${language} · ${new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date)}`;
}

function setStatus(text, mode) {
    statusEl.textContent = text;
    statusEl.classList.toggle('is-live', mode === 'live');
    statusEl.classList.toggle('is-error', mode === 'error');
}

function hasRealConfig(config) {
    if (!config || typeof config !== 'object') return false;
    const required = ['apiKey', 'authDomain', 'projectId', 'appId'];
    return required.every(key => {
        const value = String(config[key] || '');
        return value.length > 0 && !value.includes('PASTE_');
    });
}
