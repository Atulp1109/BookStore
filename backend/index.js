const express = require('express');
const dotenv =require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
const bookRouter =require ('./routes/BookRoutes.js');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument= require('./swagger-output.json');
const app=express();
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss:
        '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL,
}));


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


app.use('/books',require ('./routes/BookRoutes.js'))

app.listen(port,()=>{
    console.log(`Api docs - http://localhost:4000/api-docs`);
})

mongoose
    .connect(process.env.mogodbUrl)
    .then(
        console.log("App connected")
    )
    .catch((error)=>{
        console.log(error);
    })
