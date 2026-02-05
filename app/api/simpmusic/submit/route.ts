import crypto from 'crypto';
import express from 'express';

const router = express.Router();
const SECRET = 'simpmusic-lyrics';

function generateHMAC(timestamp: string, requestUri: string): string {
    const data = timestamp + requestUri;
    return crypto.createHmac('sha256', SECRET).update(data).digest('hex');
}

router.post('/submit', (req, res) => {
    const timestamp = new Date().toUTCString();
    const requestUri = req.originalUrl;
    const hmac = generateHMAC(timestamp, requestUri);

    // Adding headers
    req.headers['X-Timestamp'] = timestamp;
    req.headers['X-HMAC'] = hmac;

    // Simulate API request
    // (Here would be the actual implementation interacting with SimpMusic API)

    // Example error handling
    // Note: Replace this section with actual API interaction logic
    if (/* check for 401 error */) {
        return res.status(401).json({ error: 'Unauthorized access.' });
    } else if (/* check for 403 error */) {
        return res.status(403).json({ error: 'Forbidden access.' });
    } else if (/* check for 400 error */) {
        return res.status(400).json({ error: 'Bad request.' });
    } else if (/* check for 429 error */) {
        return res.status(429).json({ error: 'Too many requests.' });
    }

    res.status(200).json({ message: 'Success!' });
});

export default router;