import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import bookRouter from './routes/BookRoutes.js';


const app=express();
app.use(express.json())

// allow all origin (*)
app.use(cors())

// allow custon origin
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:["GET","POST","PUT","DELETE"],
//     allowedHeaders:["Content-Type"]
// }))

dotenv.config();

const port = process.env.PORT;

app.get("/",(request,resonse)=>{
    return resonse.status(234).send("Welcome to our site");
});


app.use('/books',bookRouter)


app.listen(port,()=>{
    console.log(`listening on ${port}`);
})

mongoose
    .connect(process.env.mogodbUrl)
    .then(
        console.log("App connected")
    )
    .catch((error)=>{
        console.log(error);
    })