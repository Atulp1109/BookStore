const swaggerAutogen =require('swagger-autogen');


const outputFile= './swagger-output.json';
const routes =['./routes/BookRoutes.js']

const doc ={
    info:{
        version:'1.0.0',
        title:'Bookstore',
        description:'Bookstore api created by atul'
    },
    host:'book-store-y7uv.vercel.app/books',
    schemes: ['http','https'],
    definitions: {
        Book: {
            title: "Metamorphisis",
            author: "Franz kafka",
            publishYear: 1993,
            _id: "67877e838870afd8dc91ce4e",
            createdAt: "2025-01-15T09:23:15.696Z",
            updatedAt: "2025-01-15T09:23:15.696Z",
            __v: 0
          },
        ListBooks:[
            {$ref: "#/definitions/Book"}
        ]
    
    },
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',          
            scheme: 'bearer',     
            bearerFormat: 'JWT',   
          },
        },
      },
    //   security: [
    //     {
    //       bearerAuth: [],          // Apply globally (optional)
    //     },
    //   ],

}

swaggerAutogen({openapi:"3.0.0"})(outputFile, routes,doc).then(() => {
    require('./index')
});
