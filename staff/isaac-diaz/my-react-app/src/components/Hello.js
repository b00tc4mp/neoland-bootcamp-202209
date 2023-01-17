import log  from '../utils/coolog'
import { useParams } from 'react-router-dom'

export default function() {
    log.info('Hello -> render')

    const { who } = useParams()

    return <h1>Hello, {who}!</h1>
}