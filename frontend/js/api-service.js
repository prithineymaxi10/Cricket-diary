/**
 * Cricket Diary API Service
 * Handles all API communication with the backend
 */

class CricketDiaryAPI {
    constructor(baseURL = 'http://localhost:5000/api') {
        this.baseURL = baseURL;
        this.timeout = 10000;
    }

    /**
     * Make API request with error handling
     */
    async request(endpoint, options = {}) {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    // ===== T20I Series Endpoints =====

    async getT20ISeries() {
        return this.request('/t20i/series');
    }

    async getT20IFeatured() {
        return this.request('/t20i/featured');
    }

    async getT20IMatches() {
        return this.request('/t20i/matches');
    }

    async getT20IMatch(matchNumber) {
        return this.request(`/t20i/matches/${matchNumber}`);
    }

    async getT20IPerformances() {
        return this.request('/t20i/performances');
    }

    async getT20IAnalysis() {
        return this.request('/t20i/analysis');
    }

    async getT20IStatistics() {
        return this.request('/t20i/statistics');
    }

    // ===== ODI Series Endpoints =====

    async getODISeries() {
        return this.request('/odi/series');
    }

    async getODIFeatured() {
        return this.request('/odi/featured');
    }

    async getODIMatches() {
        return this.request('/odi/matches');
    }

    async getODIMatch(matchNumber) {
        return this.request(`/odi/matches/${matchNumber}`);
    }

    async getODIPerformances() {
        return this.request('/odi/performances');
    }

    async getODIPreviews() {
        return this.request('/odi/previews');
    }

    async getODIContests() {
        return this.request('/odi/contests');
    }

    async getODIStatistics() {
        return this.request('/odi/statistics');
    }

    // ===== Series Overview =====

    async getSeriesOverview() {
        return this.request('/series/overview');
    }

    async getAllFeatured() {
        return this.request('/series/featured');
    }

    // ===== Articles =====

    async getAllArticles(limit = 10) {
        return this.request(`/articles?limit=${limit}`);
    }

    async searchArticles(query) {
        return this.request(`/series/search?q=${encodeURIComponent(query)}`);
    }

    // ===== Health Check =====

    async healthCheck() {
        return this.request('/health');
    }
}
