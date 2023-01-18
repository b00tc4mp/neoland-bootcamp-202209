require('dotenv').config()
//const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')
const express = require('express')

const authenticateUserHandler = require('./handlers/authenticateUserHandler')
const registerUserHandler = require('./handlers/registerUserHandler')
const retrieveUserHandler = require('./handlers/retrieveUserHandler')
const createPostHandler = require('./handlers/createPostHandler')
const retrievePublicPostsHandler = require('./handlers/retrievePublicPostsHandler')
const retrievePostHandler = require('./handlers/retrievePostHandler')
const updatePostHandler = require('./handlers/updatePostHandler')
const deletePostHandler = require('./handlers/deletePostHandler')
const retrievePostsFromUserHandler = require('./handlers/retrievePostsFromUserHandler')
const retrieveAUserHandler = require('./handlers/retrieveAUserHandler')
const retrievePostsUserHandler = require('./handlers/retrievePostsUserHandler')


const jsonBodyParser = require('./utils/jsonBodyParser')
const cors = require('./utils/cors')
const context = require('./logic/context')
const jwtVerifier = require('./utils/jwtVerifier')

const { MONGODB_URL } = process.env

//const client = new MongoClient(MONGODB_URL)


//client.connect()
mongoose.connect(MONGODB_URL)
    .then(() => { //connection
        console.log(`db connected to ${MONGODB_URL}`)

        //context.db = connection.db('test')
        context.db = mongoose.connection.client.db('test')

        const api = express()

        api.use(cors)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)
        api.post('/users', jsonBodyParser, registerUserHandler)
        api.get('/users', jwtVerifier, retrieveUserHandler)
        api.get('/users/:targetUserId', jwtVerifier, retrieveAUserHandler)
       
        api.get('/users/:targetUserId/posts', jwtVerifier, retrievePostsFromUserHandler)
        
        api.post('/posts', jwtVerifier, jsonBodyParser, createPostHandler)
        api.get('/posts/public', jwtVerifier, retrievePublicPostsHandler)
        api.get('/posts/:postId', jwtVerifier, retrievePostHandler)
        api.patch('/posts/:postId', jwtVerifier, jsonBodyParser, updatePostHandler)
        api.delete('/posts/:postId', jwtVerifier, deletePostHandler)
        api.get('/posts',jwtVerifier, retrievePostsUserHandler)

        const { PORT } = process.env

        api.listen(PORT, () => console.log(`server listening on port ${PORT}`))
    })
    .catch(error => console.error(error))
