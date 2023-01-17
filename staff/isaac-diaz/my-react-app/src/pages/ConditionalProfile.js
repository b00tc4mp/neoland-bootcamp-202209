import { useParams } from 'react-router-dom'
import Profile from './Profile'
import MyProfile from './MyProfile.js'
import log from '../utils/coolog'  
import extractSubFromToken from '../utils/extractSubFromToken'

export default () => {
    log.info('ConditionalProfile -> render')

    const { targetUserId } = useParams()

    const userId = extractSubFromToken(sessionStorage.token)

    return targetUserId === userId? <MyProfile /> : <Profile />
}