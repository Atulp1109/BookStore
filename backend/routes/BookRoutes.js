const express = require('express')
const Book = require('../models/bookModel.js')

const router = express.Router();

// create a book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Not proper Data'
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }
        const book = await Book.create(newBook);
        /* #swagger.responses[201] = { 
                schema: { "$ref": "#/definitions/Book" },
                description: "Book created successfully." } */
        return response.status(201).send(book)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//get all books
router.get("/", async (request, response) => {
        /* #swagger.security = [{
            "bearerAuth": []
    }] */
    try {
        const book = await Book.find({});
        /* #swagger.responses[200] = { 
               schema: { "$ref": "#/definitions/ListBooks" },
               description: "Books" } */
        return response.status(200).json({
            count: book.length,
            data: book
        }
        );

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message })
    }
})

//get a book by id
/* #swagger.parameters['id'] = {
                in:'path'
                required: true,                     
                type: string,                            
} */
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        
        const book = await Book.findById(id);
        /* #swagger.responses[200] = { 
               schema: { "$ref": "#/definitions/Book" },
               description: "Book Founded." } 
               #swagger.tags=['Book by id']
               */
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message })
    }
})

//updating a book
router.put('/:id', async (request, response) => {

    try {
        if (
            !request.body.title,
            !request.body.author,
            !request.body.publishYear
        ) {
            return response.status(400).send({ message: 'please provide all data' })
        }
        const { id } = request.params;
        const res = await Book.findByIdAndUpdate(id, request.body)
        if (!res) {
            return response.status(404).send({ message: 'Not found' })
        }
        /* #swagger.responses[200] = { 
               description: "Book updated successfully" } */
        return response.status(200).send({ message: 'Book updated successfully' })
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }

})

//deleting a book

router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const res = await Book.findByIdAndDelete(id)
        if (!res) {
            return response.status(404).send({ message: 'book not found' })
        }
        /* #swagger.responses[200] = { 
                description: "Book deleted sucessfully" } */
        return response.status(200).send({ message: "Book deleted sucessfully" })
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message })
    }
})

module.exports = router;