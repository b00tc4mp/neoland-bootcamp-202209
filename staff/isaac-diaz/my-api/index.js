require('dotenv').config()

const { MongoClient } = require('mongodb')
const express = require('express')

const authenticateUserHandler = require('./handlers/authenticateUserHandler')
const registerUserHandler = require('./handlers/registerUserHandler')
const searchHttpCatsHandler = require('./handlers/searchHttpCatsHandler')
const retrieveUserHandler = require('./handlers/retrieveUserHandler')
const createPostHandler = require('./handlers/createPostHandler')
const retrieveAccesPostsHandler = require('./handlers/retrieveAccesPostsHandler')
const retrievePostHandler = require('./handlers/retrievePostHandler')
const updatePostHandler = require('./handlers/updatePostHandler')
const deletePostHandler = require('./handlers/deletePostHandler')
const retrievePostsFromUserHandler = require('./handlers/retrievePostsFromUserHandler')
const retrieveAUserHandler = require('./handlers/retrieveAUserHandler')
const retrievePostsHandler = require('./handlers/retrievePostsHandler')

const jsonBodyParser = require('./utils/jsonBodyParser')
const cors = require('./utils/cors')
const context = require('./logic/context')
const jwtVerifier = require('./utils/jwtVerifier')

const { MONGODB_URL } = process.env

const client = new MongoClient(MONGODB_URL)

client.connect()
    .then(connection => {
        console.log(`db connected to ${MONGODB_URL}`)

        context.db = connection.db('test')

        const api = express()
        
        api.use(cors)
        
        api.post('/user/auth', jsonBodyParser, authenticateUserHandler)
        api.post('/users', jsonBodyParser, registerUserHandler)
        api.get('/users', jwtVerifier, retrieveUserHandler)
        api.get('/users/:targetUserId', jwtVerifier, retrieveAUserHandler)
        
        api.get('/users/:targetUserId/posts', jwtVerifier, retrievePostsFromUserHandler)
        
        api.post('/posts', jwtVerifier, jsonBodyParser, createPostHandler)
        api.get('/posts/access', jwtVerifier, retrieveAccesPostsHandler)
        api.get('/posts/:postId', jwtVerifier, retrievePostHandler)
        api.patch('/posts/:postId', jwtVerifier, jsonBodyParser, updatePostHandler)
        api.delete('/posts/:postId', jwtVerifier, deletePostHandler)
        api.get('/posts', jwtVerifier, retrievePostsHandler)
        
        api.get('/search', searchHttpCatsHandler)
        
        const { PORT } = process.env
        
        api.listen(PORT, () => console.log(`server listening on port ${PORT}`))
        
    })
    .catch(error => console.error(error))
