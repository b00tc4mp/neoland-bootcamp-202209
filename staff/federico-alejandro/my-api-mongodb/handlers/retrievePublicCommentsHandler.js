// const retrievePublicComments = require('../logic/retrievePublicComments')

// module.exports = (req, res) => {
//     try {
//         const { userId } = req

//         retrievePublicComments(userId)
//             .then(comments => res.json(comments))
//             .catch(error => res.status(500).json({ error: error.message }))
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }