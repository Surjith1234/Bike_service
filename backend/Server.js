const express=require('express')
const app=express();
const cors=require('cors') //to enable the access to frontend and backend
const mongoose=require('mongoose')
app.use(cors())
app.use(express.json())
const connect=async()=>{// to connect the database
    try {
        await mongoose.connect('mongodb+srv://surjith:surjith2003@cluster0.pw1ezze.mongodb.net/service?retryWrites=true&w=majority&appName=Cluster0')
        console.log("connected");
    }
    catch(err)
    {
        throw err;
    }
}
connect()
app.use('/api/user',require('./routes/User'))//route to user page 
app.use('/api/img',require('./routes/Image'))//route to image page
app.use('/api/service',require('./routes/Service'))//route to service page
app.use('/api/booking',require('./routes/Booking'))//route to booking page
app.listen(4000,()=>{ // server is running on port 4000
    console.log("server is running on 4000")
})
