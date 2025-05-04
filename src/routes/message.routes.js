import express from 'express';
import { createMessage, searchMessages, getRandomMessages } from '../controllers/message.controller.js';
import turnstileMiddleware from '../middlewares/turnstile.middleware.js';
const messageRoutes = express.Router();

messageRoutes.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, world!' });
});

messageRoutes.post('/create', createMessage, turnstileMiddleware);
messageRoutes.get('/search', searchMessages);
messageRoutes.get('/random', getRandomMessages);

export default messageRoutes;