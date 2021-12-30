const express = require('express');
const userRoute = require('./routes/userRoute');
const dotenv= require('dotenv');
const connectDb = require('./config/db');
const jwtVeify = require('./middleware/auth');
dotenv.config()

connectDb();

const app = express();
const PORT = 8000;

app.use(express.json())
app.use('/',userRoute)

app.get('/token', jwtVeify,(req,res)=>{
    res.send('Token is validated')
})

app.listen(PORT,()=>{
    console.log('Server is runnong on PORT '+ PORT );
})