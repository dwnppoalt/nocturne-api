import express from 'express';
import messageRoutes from '../src/routes/message.routes.js';
import cors from 'cors';

const corsOptions = {origin: '*'}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(messageRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default app;