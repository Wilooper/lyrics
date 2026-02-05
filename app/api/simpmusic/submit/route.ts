import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

// HMAC authentication key
const HMAC_KEY = process.env.HMAC_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Your HMAC authentication logic here
    const hmac = crypto.createHmac('sha256', HMAC_KEY);
    const digest = hmac.update(req.body).digest('hex');

    // Validate the HMAC
    if (req.headers['x-signature'] !== digest) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    // Handle the request logic for submitting music
    if (req.method === 'POST') {
        // Your existing submission logic here
        return res.status(200).json({ message: 'Music submitted successfully.' });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}