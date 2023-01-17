import log from '../utils/coolog'
import { useEffect, useState } from 'react'
import retrieveUser from '../logic/retrieveUser'
import Header from '../components/Header'
import { useContext } from 'react'
import Context from '../components/Context'
import { errors } from 'com'
import CreateVehicle from '../components/CreateVehicle'
import TarjetVehicle from '../components/TarjetVehicle'
import retrieveVehicles from '../logic/retrieveVehicles'

const { AuthError, FormatError, LengthError, NotFoundError } = errors

function Home() {
    log.info('Home -> render')

    const [user, setUser] = useState()
    const [vehicles, setVehicles] = useState()
    const { showAlert } = useContext(Context)
    const [createVehicleVisible, setCreateVehicleVisible] = useState(false)

    useEffect(() => {
        try {
            retrieveUser(sessionStorage.token)
                .then(user => {
                    setUser(user)

                    return retrieveVehicles(sessionStorage.token)
                })
                .then(vehicles => setVehicles(vehicles))
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

    const vehiclesToRetrieve = () => {
        try {
            retrieveVehicles(sessionStorage.token)
                .then(vehicles => setVehicles(vehicles))
                .catch(error => {
                    if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                        showAlert(error.message, 'warn')
                    else if (error instanceof NotFoundError)
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
    }

    const openCreateVehicle = () => setCreateVehicleVisible(true)

    const closeCreateVehicle = () => setCreateVehicleVisible(false)


    const handleCreatedVehicle = () => {
        
        closeCreateVehicle()
    }
   
   return <main className='h-80 w-screen overflow-y-auto mt-16 min-h-screen overflow-hidden bg-black dark:bg-black text-black dark:text-white m-6'>
        {vehicles && !createVehicleVisible && vehicles.length > 0 && vehicles.map(vehicle => <TarjetVehicle vehicle={vehicle} refreshVehicles={vehiclesToRetrieve} />)}
        {createVehicleVisible && <CreateVehicle onClose={closeCreateVehicle} onCreated={handleCreatedVehicle} />}
        {user && <Header userName={user.name} />}
        <div className='flex justify-center items-center'>
            {!createVehicleVisible && <button onClick={openCreateVehicle} className='bg-pink-600 hover:bg-purple-600 duration-700 ease-in-out hover:scale-75 hover:shadow-rose-800 p-12 border rounded-full text-xl'>Add</button>}
        </div>
    </main>
}

export default Home