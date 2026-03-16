// config.js - Centralized API configuration
const CONFIG = {
  API_URL: 'http://127.0.0.1:3001/api'
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
