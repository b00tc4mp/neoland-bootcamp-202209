const deleteQuest = require("../logic/deleteQuest");

module.exports = (req, res) => {
    try {
        const { userId, params: { questId } } = req;

        deleteQuest(userId, questId)
            .then(() => res.status(204).send())
            .catch((error) => res.status(500).json({ error: error.message }));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};