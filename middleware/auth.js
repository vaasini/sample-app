const API_KEYS = ['test-key-123', 'dev-key-456'];

function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || !API_KEYS.includes(apiKey)) {
    return res.status(401).json({ error: 'Unauthorized: invalid or missing API key' });
  }
  next();
}

module.exports = { apiKeyAuth };
