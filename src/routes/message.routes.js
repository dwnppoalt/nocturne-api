import express from 'express';
import { createMessage, searchMessages, getRandomMessages, getMessage } from '../controllers/message.controller.js';
import turnstileMiddleware from '../middlewares/turnstile.middleware.js';
const messageRoutes = express.Router();

messageRoutes.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, world!' });
});

messageRoutes.post('/create', turnstileMiddleware, createMessage);
messageRoutes.get('/search', searchMessages);
messageRoutes.get('/random', getRandomMessages);
messageRoutes.get('/message/:id', getMessage);

export default messageRoutes;