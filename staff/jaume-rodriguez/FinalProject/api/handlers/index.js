module.exports = {
    handlerRegister: require('./handlerRegister'),
    handlerAuth: require('./handlerAuth'),

    handlerRetrieveUser: require('./handlerRetrieveUser'),
    handlerRetrieveUsers: require('./handlerRetrieveUsers'),
    handlerRetrieveAUser: require('./handlerRetrieveAUser'),
    handlerUpdateUserName: require('./handlerUpdateUserName'),
    handlerUpdateUserEmail: require('./handlerUpdateUserEmail'),
    handlerUpdateUserPassword: require('./handlerUpdateUserPassword'),

    handlerCreatePost: require('./handlerCreatePost'),
    handlerRetrievePost: require('./handlerRetrievePost'),
    handlerRetrievePostsFromUser: require('./handlerRetrievePostsFromUser'),
    handlerRetrievePublicPosts: require('./handlerRetrievePublicPosts'),
    handlerUpdatePost: require('./handlerUpdatePost'),
    handlerDeletePost: require('./handlerDeletePost'),

    handlerCreateQuest: require('./handlerCreateQuest'),
    handlerRetrieveQuest: require('./handlerRetrieveQuest'),
    handlerRetrieveQuests: require('./handlerRetrieveQuests'),
    handlerRetrieveMainQuests: require('./handlerRetrieveMainQuests'),
    handlerRetrieveMainRandomQuest: require('./handlerRetrieveMainRandomQuest'),
    handlerUpdateQuest: require('./handlerUpdateQuest'),
    handlerDeleteQuest: require('./handlerDeleteQuest'),
    handlerPlayQuest: require('./handlerPlayQuest'),

    handlerCreateAdventure: require('./handlerCreateAdventure'),
    handlerCreateAdventureStep: require('./handlerCreateAdventureStep'),
    handlerRetrieveAdventure: require('./handlerRetrieveAdventure'),
    handlerRetrieveAdventures: require('./handlerRetrieveAdventures'),
    handlerRetrieveMyAdventures: require('./handlerRetrieveMyAdventures'),
    handlerRetrieveMainAdventures: require('./handlerRetrieveMainAdventures'),
    handlerRetrieveWorldAdventures: require('./handlerRetrieveWorldAdventures'),
    handlerUpdateAdventure: require('./handlerUpdateAdventure'),
    handlerDeleteAdventure: require('./handlerDeleteAdventure'),
    handlerDeleteAdventureStep: require('./handlerDeleteAdventureStep'),
    handlerPlayAdventure: require('./handlerPlayAdventure')

}