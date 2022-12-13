import log from '../utils/coolog'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { errors } from 'com'
import retrieveUser from '../logic/retrieveUser'
import Context from '../components/Context'
import { useContext } from 'react'
import retrieveEvents from '../logic/retrieveEvents'

const { FormatError, AuthError, LengthError, NotFoundError } = errors


function Events() {
    log.info('Events -> render')

    const { showAlert } = useContext(Context)

    const [user, setUser] = useState()
    const [events, setEvents] = useState([])

    useEffect(() => {
        try {
            Promise.all([retrieveUser(sessionStorage.token), retrieveEvents(sessionStorage.token)])
                .then(([user, events]) => {
                    setUser(user)
                    setEvents(events)
                })
                .catch(error => {
                    if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                        showAlert(error.message, 'warn')
                    else if (error instanceof AuthError || error instanceof NotFoundError)
                        showAlert(error.message, 'error')
                    else
                        showAlert(error.message, 'fatal')
                })
        } catch (error) {
            if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                showAlert(error.message, 'warn')
            else
                showAlert(error.message, 'fatal')
        }

    }, [])
 
    const navigate = useNavigate()
    const goHome = () => {
        navigate('/')
    }

    const handlerMonth=(month) => {
        navigate(`/events/${month}`)
    }

    return <main className="h-full">
        <header className='h-1/6 top-0 flex justify-around items-center bg-teal-600	'>
        <h1>12 MESES, 12 ACTIVIDADES</h1>
                <button onClick={goHome} >HOME</button>
        </header>
        <div className="grid grid-cols-2 gap-4 p-4">

            {events.map(event => <button onClick={()=>handlerMonth(event.month)}>
            <div className='border rounded-xl h-36 p-2'>
                <h1>{event.month}</h1>
                <p>title</p>
                <p>resumen</p>
            </div></button>)}
        </div>
        
        {/* {january && <CreateEvent closeCreate={() => setJanuary()}/>} */}

    </main>

}

export default Events
