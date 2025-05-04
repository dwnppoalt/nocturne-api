import express from 'express';
import messageRoutes from '../src/routes/message.routes.js';
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173',   // Local development
  'https://nocturne-black.vercel.app/'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // Handle non-origin requests like from Postman
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(messageRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default app;