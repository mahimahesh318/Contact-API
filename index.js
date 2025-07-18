import express from 'express'
import mongoose from 'mongoose'
// import bodyParser from 'express'
// import { User } from './Models/User.js';
// import { register } from './Controllers/userController.js';
import userRouter from './Routes/user.js'
import contactRouter from './Routes/contact.js'
import { config } from 'dotenv'

// .env setup
config({path : '.env'})

const app = express();
const port = process.env.PORT;
app.use(express.json());



// <------------------- user routes -----------------?
//app.user -> app.use

app.use('/api/user', userRouter)

app.use('/api/contact',contactRouter) 


mongoose.connect(process.env.MONGO_URL,
  {dbName : "NodeJS"},
).then(()=>console.log("monogdb connected")).catch((err)=>console.log(err));




app.get('/',(req,res)=>{
  res.json({message : "First Project"})
});


app.listen(port,()=>{
  console.log(`server is running on port ${port}`)
});