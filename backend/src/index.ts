import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import userRoutes from '../src/routes/userRoutes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.use('/api', userRoutes); // Prefix all routes with /api

app.get('/', (req,res)=>{
    res.send("Hellow worl")
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})



