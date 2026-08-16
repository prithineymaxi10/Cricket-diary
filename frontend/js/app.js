/**
 * Cricket Diary Frontend Application
 * Loads live match data from the API and renders it in newspaper style.
 * Also wires up section switching between Match Coverage and the game,
 * and listens for live "coverage updated" pushes over Socket.io so open
 * tabs refresh automatically when match data changes on the server.
 */

// Configure API URL based on environment
const API_BASE_URL = localStorage.getItem('apiUrl') || 'http://localhost:5000/api';
const api = new CricketDiaryAPI(API_BASE_URL);

// ===== UI State =====
const state = {
    currentSection: 'coverage',
    t20iData: null,
    odiData: null,
    loading: true
};

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    connectLiveUpdates();
});

async function initializeApp() {
    try {
        console.log('🏏 Cricket Diary - Loading data from API...');

        const [t20iData, odiData] = await Promise.all([
            loadT20IData(),
            loadODIData()
        ]);

        state.t20iData = t20iData;
        state.odiData = odiData;
        state.loading = false;

        renderNewspaperContent();

        console.log('✓ Application loaded successfully');
    } catch (error) {
        console.error('❌ Error loading data:', error);
        showError('Failed to load cricket data. Please check your connection.');
    }
}

// ===== Live Updates (Socket.io) =====
// When match data changes on the server (e.g. someone re-runs the seed
// script), every open tab silently refreshes its coverage - no manual
// reload needed.

function connectLiveUpdates() {
    if (typeof io === 'undefined') {
        console.warn('Socket.io client not loaded — live coverage updates disabled');
        return;
    }

    const socketUrl = API_BASE_URL.replace(/\/api\/?$/, '');
    const socket = io(socketUrl);

    socket.on('coverage:updated', async () => {
        console.log('📡 Live update received — refreshing coverage...');
        flashLiveDot();
        try {
            const [t20iData, odiData] = await Promise.all([loadT20IData(), loadODIData()]);
            state.t20iData = t20iData;
            state.odiData = odiData;
            renderNewspaperContent();
        } catch (error) {
            console.error('Error refreshing live coverage:', error);
        }
    });
}

function flashLiveDot() {
    const dot = document.getElementById('live-dot');
    if (!dot) return;
    dot.style.display = 'inline-block';
    setTimeout(() => { dot.style.display = 'none'; }, 4000);
}

// ===== Data Loading =====

async function loadT20IData() {
    try {
        const [featured, statistics, matches, performances, analysis] = await Promise.all([
            api.getT20IFeatured(),
            api.getT20IStatistics(),
            api.getT20IMatches(),
            api.getT20IPerformances(),
            api.getT20IAnalysis()
        ]);

        return { featured, statistics, matches, performances, analysis };
    } catch (error) {
        console.error('Error loading T20I data:', error);
        throw error;
    }
}

async function loadODIData() {
    try {
        const [featured, statistics, matches, performances, previews] = await Promise.all([
            api.getODIFeatured(),
            api.getODIStatistics(),
            api.getODIMatches(),
            api.getODIPerformances(),
            api.getODIPreviews()
        ]);

        return { featured, statistics, matches, performances, previews };
    } catch (error) {
        console.error('Error loading ODI data:', error);
        throw error;
    }
}

// ===== Newspaper Rendering =====

function renderNewspaperContent() {
    const t20iData = state.t20iData;
    const odiData = state.odiData;

    if (!t20iData || !odiData) return;

    document.getElementById('newspaper-t20i-content').innerHTML = generateT20INewspaperContent(t20iData);
    document.getElementById('newspaper-odi-content').innerHTML = generateODINewspaperContent(odiData);
}

function generateT20INewspaperContent(data) {
    const article = data.featured;
    const matches = data.matches;

    return `
        <article class="lead-story-newspaper">
            <h1 class="lead-headline-newspaper">${article.title}</h1>
            <div class="byline-newspaper">By ${article.author} | ${new Date(article.date).toLocaleDateString()}</div>

            <p class="first">${article.content}</p>

            <p>The series showcased a stark clash between experience and youth. England fielded a battle-hardened squad with accomplished international players, while India's team was laden with debutants and players making their maiden international appearance in challenging English conditions. Despite valiant efforts from individual performers, India's collective performance fell significantly short of expectations.</p>
        </article>

        <div class="columns-newspaper">
            <div class="column-newspaper">
                <h2 class="section-headline-newspaper">T20I Match Breakdown</h2>
                ${matches.slice(0, 3).map(match => `
                    <h3 class="subsection-heading-newspaper">${match.title}</h3>
                    <p class="column-paragraph-newspaper">${match.content}</p>
                `).join('')}
            </div>

            <div class="column-newspaper">
                <h2 class="section-headline-newspaper">Tournament Continuation</h2>
                ${matches.slice(3).map(match => `
                    <h3 class="subsection-heading-newspaper">${match.title}</h3>
                    <p class="column-paragraph-newspaper">${match.content}</p>
                `).join('')}
                <div class="statistics-box-newspaper">
                    <h3>T20I Series Statistics</h3>
                    ${data.statistics.map(stat => `<p><strong>${stat.label}:</strong> ${stat.value}</p>`).join('')}
                </div>
            </div>
        </div>

        <h2 class="section-headline-newspaper" style="margin-top: 2.5rem;">In-Depth Analysis</h2>
        <div class="columns-newspaper">
            ${[0, 1].map(colIndex => `
                <div class="column-newspaper">
                    ${data.analysis.filter((_, i) => i % 2 === colIndex).map(item => `
                        <h3 class="subsection-heading-newspaper">${item.title}</h3>
                        <p class="column-paragraph-newspaper">${item.content}</p>
                    `).join('')}
                </div>
            `).join('')}
        </div>
    `;
}

function generateODINewspaperContent(data) {
    const article = data.featured;
    const matches = data.matches;

    return `
        <div class="series-divider-newspaper"></div>

        <article class="lead-story-newspaper">
            <h1 class="lead-headline-newspaper">${article.title}</h1>
            <div class="lead-subheading-newspaper">${article.subtitle || ''}</div>
            <div class="byline-newspaper">By ${article.author} | ${new Date(article.date).toLocaleDateString()}</div>

            <p class="first">${article.content}</p>
        </article>

        <div class="columns-newspaper">
            <div class="column-newspaper">
                <h2 class="section-headline-newspaper">Match Reports</h2>
                ${matches.map(match => `
                    <h3 class="subsection-heading-newspaper">${match.title}</h3>
                    <p class="column-paragraph-newspaper">${match.content}</p>
                    <div class="highlight-box-newspaper">
                        <h3>${match.venue || 'Match'} Figures</h3>
                        <p><strong>Result:</strong> ${match.result}</p>
                        <p><strong>Player of Match:</strong> ${match.playerOfMatch}</p>
                    </div>
                `).join('')}
            </div>

            <div class="column-newspaper">
                <h2 class="section-headline-newspaper">3rd ODI Preview — Lord's</h2>
                ${data.previews.slice(0, 4).map(preview => `
                    <h3 class="subsection-heading-newspaper">${preview.title}</h3>
                    <p class="column-paragraph-newspaper">${preview.content}</p>
                `).join('')}
                <div class="statistics-box-newspaper">
                    <h3>Key Stats</h3>
                    ${data.statistics.map(stat => `<p><strong>${stat.label}:</strong> ${stat.value}</p>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// ===== Section Navigation (Coverage / Game) =====

function switchSection(sectionName, btnEl) {
    document.querySelectorAll('.diary-section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.section-nav-btn').forEach(btn => btn.classList.remove('active'));

    document.getElementById(sectionName + '-section').classList.add('active');

    const clickedBtn = btnEl || (typeof event !== 'undefined' ? event.target.closest('.section-nav-btn') : null);
    if (clickedBtn) clickedBtn.classList.add('active');

    if (sectionName === 'game') {
        cricketGame.init();
    }

    state.currentSection = sectionName;
}

// ===== Utilities =====

function showError(message) {
    console.error('⚠️', message);
    alert(message);
}

function setAPIUrl(url) {
    localStorage.setItem('apiUrl', url);
    location.reload();
}

async function checkAPIHealth() {
    try {
        const health = await api.healthCheck();
        console.log('✓ API Health:', health);
        return true;
    } catch (error) {
        console.error('❌ API Health Check Failed:', error);
        return false;
    }
}
