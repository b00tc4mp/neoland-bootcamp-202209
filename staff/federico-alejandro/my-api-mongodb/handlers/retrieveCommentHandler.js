// const retrieveComment = require('../logic/retrieveComment')

// module.exports = (req, res) => {
//     try {
//         const { params: { targetUserId }, userId } = req

//         retrieveComment(userId, targetUserId)
//             .then(comment => res.json(comment))
//             .catch(error => res.status(500).json({ error: error.message }))
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }
