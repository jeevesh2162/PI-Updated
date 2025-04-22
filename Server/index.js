import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { dbConnect } from './db.js';
import mockRoute from './Routes/mockRoute.js'
import ansRoute from './Routes/answerRoute.js';
import userRouter from './Routes/userRoute.js';

const app = express();
// Load environment variables
dotenv.config();

// Initialize database connection
dbConnect();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use('/api',mockRoute);
app.use('/api',ansRoute);
app.use('/api',userRouter)



// Public Route
app.get('/', (req, res) => {
  res.send('Welcome to the public route!');
});



// Start server
const PORT = process.env.PORT||4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
