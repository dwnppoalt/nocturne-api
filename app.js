import express from 'express';
import messageRoutes from './src/routes/message.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(messageRoutes);

export default app;