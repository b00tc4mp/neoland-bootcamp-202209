const { model } = require('mongoose')
const { user, post } = require('./schemas')

const User = model('User', user)
const Post = model('Post', post)

module.exports = {
    User,
    Post
}