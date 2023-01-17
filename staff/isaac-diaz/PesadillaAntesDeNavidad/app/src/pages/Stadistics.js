import { useContext } from 'react'
import Context from '../components/Context'
import retrieveVehicle from '../logic/retrieveVehicle'
import { useState, useEffect } from 'react'
import log from '../utils/coolog'
import retrieveUser from '../logic/retrieveUser'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import updateVehicle from '../logic/updateVehicle'
import calculateNextItvDate from '../logic/helpers/calculateNextItvDate'
import calculateNextCheckOilDate from '../logic/helpers/calculateNextCheckOil'
import { errors } from 'com'
const { FormatError, LengthError, AuthError, NotFoundError } = errors

export default function Stadistics() {
    log.info('render -> myProfile')

    const { showAlert } = useContext(Context)

    const [user, setUser] = useState()
    const [vehicle, setVehicle] = useState()
    const [nextItvDate, setNextItvDate] = useState()
    const [nextOilCheckDate, setNextOilCheckDate] = useState()
    // const [editVehicleVisible, setEditVehicleVisible] = useState()

    const { vehicleId } = useParams()

    useEffect(() => {
        try {
            Promise.all([retrieveUser(sessionStorage.token), retrieveVehicle(sessionStorage.token, vehicleId)])
                .then(([user, vehicle]) => {
                    setUser(user)
                    setVehicle(vehicle)
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

    useEffect(() => {
        if (vehicle && vehicle.licenseDate) {
            const lastItvDateToSent = vehicle.lastItvDate && new Date(vehicle.lastItvDate)

            const nextItvDateCalculated = calculateNextItvDate(
                new Date(vehicle.licenseDate),
                lastItvDateToSent
            )

            const lastCheckOilDateToSend = vehicle.lastOilCheckDate && new Date(vehicle.lastOilCheckDate)

            const nextCheckDateCalculated = calculateNextCheckOilDate(
                vehicle.lastOilCheckKms,
                lastCheckOilDateToSend,
                new Date(vehicle.licenseDate),
                vehicle.fuelType
            )

            setNextItvDate(nextItvDateCalculated)
            setNextOilCheckDate(nextCheckDateCalculated)
        }
    }, [vehicle])

    const onUpdateVehicle = event => {
        event.preventDefault()

        const { brand: { value: brand }, model: { value: model }, fuelType: { value: fuelType }, license: { value: license },
            licenseDate: { value: licenseDate }, kms: { value: kms }, lastOilCheckDate: { value: lastOilCheckDate }, lastOilCheckKms: { value: lastOilCheckKms },
            lastItvDate: { value: lastItvDate }, tyrePressureFront: { value: tyrePressureFront }, tyrePressureRear: { value: tyrePressureRear } } = event.target

        try {
            updateVehicle(sessionStorage.token, vehicleId, brand, model, fuelType, license, new Date(licenseDate), parseInt(kms), new Date(lastOilCheckDate),
                parseInt(lastOilCheckKms), new Date(lastItvDate), tyrePressureFront, tyrePressureRear)
                .then(() => {
                    retrieveVehicle(sessionStorage.token, vehicleId)
                        .then(vehicle => setVehicle(vehicle))
                    // setVehicle({ ...vehicle, brand, model, fulType, license, licenseDate, kms, lastItv, lastCheckOil, tyrePressure })
                })
                .catch (error => {
                if (error instanceof TypeError || error instanceof LengthError || error instanceof FormatError)
                    showAlert(error.message, 'warn')
                else if (error instanceof NotFoundError)
                    showAlert(error.message, 'error')
                else
                    showAlert(error.message, 'fatal')
            })
        } catch (error) {
            if (error instanceof TypeError || error instanceof LengthError || error instanceof FormatError)
                showAlert(error.message, 'warn')
            else
                showAlert(error.message, 'fatal')
        }
    }

    return <main className='h-full bg-red-400 flex items-center justify-center mt-6'>
        {user && <Header userName={user.name} />}
        {/* {editVehicleVisible && <EditVehicle onClose={closeEditVisible} onEdited={handleEditVehicle} />} */}
        <form onSubmit={onUpdateVehicle} className='flex flex-col items-center justify-center mt-36 border-black'>
            <div className='flex flex-col border-2 gap-2 mt-32'>
                <h2>Brand</h2>
                <input required name='brand' id='brand' type='text' defaultValue={vehicle?.brand} />
                <h2>Model</h2>
                <input required name='model' id='model' type='text' defaultValue={vehicle?.model} />
                <h2>Fuel type</h2>
                <select id='fuelType' defaultValue={vehicle?.fuelType}>
                    <option name='gasolina' type='text' id='gasolina' value='gasolina'>gasolina</option>
                    <option name='diesel' type='text' id='diesel' value='diesel'>diesel</option>
                </select>
            </div>
            <div className='flex flex-col border-2 gap-2'>
                <h2>license</h2>
                <input required name='license' id='license' type='text' defaultValue={vehicle?.license} />
                <h2>licenseDate</h2>
                <input required name='licenseDate' id='licenseDate' type='Date' defaultValue={vehicle?.licenseDate?.slice(0, -14)} />
                <h2>kms</h2>
                <input required name='kms' id='kms' type='number' defaultValue={vehicle?.kms} />
            </div>
            <div className='flex flex-col border-2 gap-2'>
                <h2>Last check oil date</h2>
                <input name='lastOilCheckDate' id='lastOilCheckDate' type='Date' defaultValue={vehicle?.lastOilCheckDate?.slice(0, -14)} />
                <h2>Last check oil kms</h2>
                <input name='lastOilCheckKms' id='lastOilCheckKms' type='number' defaultValue={vehicle?.lastOilCheckKms} />
                <h2>Next check Oil Date</h2>
                {nextOilCheckDate && <p>{nextOilCheckDate.nextOilCheckDate.toISOString().slice(0, -14).split('-').reverse().join('/')}</p>}
                <h2>Next ckeck Oil Kms</h2>
                {nextOilCheckDate && <p>{nextOilCheckDate.nextOilCheckKms}</p>}
            </div>
            <div className='flex flex-col border-2 gap-2'>
                <h2>Last ITV</h2>
                <input name='lastItvDate' id='lastItvDate' type='Date' defaultValue={vehicle?.lastItvDate?.slice(0, -14)} />
                <h2>Next ITV</h2>
                {nextItvDate && <p>{nextItvDate.toISOString().slice(0, -17).split('-').reverse().join('/')}</p>}
                <h2>Tyre pressure front</h2>
                <input required name='tyrePressureFront' id='tyrePressureFront' type='text' defaultValue={vehicle?.tyrePressureFront} />
                <h2>Tyre pressure rear</h2>
                <input required name='tyrePressureRear' id='tyrePressureRear' type='text' defaultValue={vehicle?.tyrePressureRear} />
            </div>
            <div>
                <button className='border-black p-8'>Update</button>
            </div>
        </form>
    </main>
}