const turnstileMiddleware = (req, res, next) => {
    const { 'cf-turnstile-response': token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Turnstile token is missing' });
    }

    fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: token,
            remoteip: req.ip,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                console.log('Turnstile verification successful:', data);
                next();
            } else {
                res.status(400).json({ error: 'Turnstile verification failed' });
            }
        })
        .catch((error) => {
            console.error('Error verifying Turnstile token:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
}

export default turnstileMiddleware;