// const createComment = require('../logic/createComment')

// module.exports = (req, res) => {
//     try {
//         const { body: { text }, params: { commentId}, userId } = req

//         createComment(userId, commentId, text)
//             .then(() => res.status(201).send())
//             .catch(error => res.status(500).json({ error: error.message }))
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }