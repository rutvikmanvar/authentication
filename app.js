require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 7777;
const app = express();
const {connectToMongo} = require('./connection')
const authenticationRoute = require('./routes/authentication_route');
const userRoute = require('./routes/user_route');
const contactRoute = require('./routes/contact_route')

// connectToMongo('mongodb://localhost:27017/authentication')
connectToMongo(process.env.MONGO_URL)


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/auth',authenticationRoute);
app.use('/user/add',userRoute)
app.use('/contact',contactRoute )

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})