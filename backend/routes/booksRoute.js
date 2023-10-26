import express from 'express'
import { Book } from '../models/bookModel.js'

const router = express.Router()

router.post('/', async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.publishYear) {
      return response.status(400).send({ message: 'Send all required fields: title, author, publishYear' })
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear
    }
    const book = await Book.create(newBook)
    response.status(201).send(book)
  } catch (error) {
    console.log(error)
    response.status(500).send({ message: error.message })
  }
})

router.get('/', async (request, response) => {
  try {
    const books = await Book.find({})
    return response.status(200).json({
      count: books.length,
      data: books
    })
  } catch (error) {
    console.log(error.message)
    response.status(400).send({ message: error.message })
  }
})

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const bookFound = await Book.findById({ _id: id })
    return response.status(200).json(bookFound)
  } catch (error) {
    console.log(error.message)
    response.status(400).send({ message: error.message })
  }
})

router.put('/:id', async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.publishYear) {
      return response.status(400).send({ message: 'Send all required fields: title, author, publishYear' })
    }
    const { id } = request.params
    // const { title, author, publishYear } = request.body
    const result = await Book.findByIdAndUpdate(id, request.body)
    if (!result) {
      return response.status(404).json({ message: 'Book not found' })
    }

    return response.status(200).send({ message: 'Book Update successfully' })
  } catch (error) {
    response.status(500).json({ message: 'Error interno del servidor' })
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const deleteBook = await Book.findByIdAndDelete(id)
    if (!deleteBook) {
      return response.status(404).json({ message: 'Book not found' })
    }
    return response.status(200).send({ message: 'Book deleted successfully' })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

export default router
