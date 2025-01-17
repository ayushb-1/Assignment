import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import userRoutes from '../src/routes/userRoutes'
import 'express-async-errors';
import  connectDB  from './utils/db';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: 'https://hobby-app.netlify.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}));

app.use(express.json());

app.use('/api', userRoutes); // Prefix all routes with /api

app.get('/', (_,res)=>{
    res.send("Hellow worl")
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})



