require('dotenv').config()

const { MongoClient } = require('mongodb')
const registerUser = require('./registerUser')
const context = require('./context')
const { expect } = require('chai')

const {
    errors: { ConflictError }
} = require('my-commons')

const { MONGODB_URL } = process.env

describe('registerUser', () => {
    let client

    before(() => {
        client = new MongoClient(MONGODB_URL)

        return client.connect()
            .then(connection => {
                console.log(`db connected to ${MONGODB_URL}`)

                context.db = connection.db('test')
            })
    })

    beforeEach(() => context.db.collection('users').deleteMany())

    it('succeeds on new user', () => {
        return registerUser('Oso Perez', 'oso@perez.com', '123123123')
            .then(() => context.db.collection('users').findOne({ email: 'oso@perez.com' }))
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal('Oso Perez')
                //expect(user.email).to.equal('oso@perez.com')
                expect(user.password).to.equal('123123123')
            })
    })

    it('fails on existing user', () => {
        return context.db.collection('users').insertOne({ name: 'Cape Rucita', email: 'cape@rucita.com', password: '123123123' })
            .then(() => {
                return registerUser('Cape Rucita', 'cape@rucita.com', '123123123')
            })
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(ConflictError)
                expect(error.message).to.equal('user with email cape@rucita.com already exists')
            })
    })

    after(() => client.close())
})