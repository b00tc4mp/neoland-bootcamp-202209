import log from '../utils/coolog'
import Button from './Button'
import DeleteVehicle from '../components/DeleteVehicle'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StatusVehicle from '../logic/helpers/calculateStatusVehicle'
import calculateStatusVehicle from '../logic/helpers/calculateStatusVehicle'
import calculateNextItvDate from '../logic/helpers/calculateNextItvDate'
import calculateNextCheckOil from '../logic/helpers/calculateNextCheckOil'
// const [vehicle, setVehicles] = useState

export default function ({ vehicle, refreshVehicles }) {
    log.info('Tarjet -> render')
    const [vehicleToDelete, setVehicleToDelete] = useState()
    const [status, setStatus] = useState()
    // "problemas", "warning" or "perfect"

    useEffect(() => {
        if (vehicle && vehicle.licenseDate) {
            const lastItvDateToSent = vehicle.lastItvDate && new Date(vehicle.lastItvDate)

            const nextItvDateCalculated = calculateNextItvDate(
                new Date(vehicle.licenseDate),
                lastItvDateToSent
            )

            const lastCheckOilDateToSend = vehicle.lastOilCheckDate && new Date(vehicle.lastOilCheckDate)

            const nextCheckOilDateCalculated = calculateNextCheckOil(
                vehicle.lastOilCheckKms,
                lastCheckOilDateToSend,
                new Date(vehicle.licenseDate),
                vehicle.fuelType
            )

            const statusCalculated = calculateStatusVehicle(nextCheckOilDateCalculated.nextOilCheckDate, nextItvDateCalculated)

            setStatus(statusCalculated)
        }
    }, [vehicle])

    const onDeleted = () => {
        setVehicleToDelete()
        refreshVehicles()
    }

    const openDeleteVehicle = vehicleId => {
        setVehicleToDelete(vehicleId)
    }
    const closeDeleteVehicle = () => setVehicleToDelete()

    return <section className='flex flex-col items-center'>
        <div className={`w-120 h-40 flex items-center border-2 border-black m-4 gap-2 rounded-xl shadow-xl shadow-pink-600 ${status === "problems" ? "bg-red-500" : status === "warning" ? "bg-yellow-400" : status === "perfect" ? "bg-green-400" : "bg-white"}`}>
            <Link className='m-4 flex items-center cursor-pointer' to={`/stadistics/${vehicle.id}`} >
                <div>
                    <label className='underline text-lg'>Brand</label>
                    <p>{vehicle.brand}</p>
                    <label className='underline text-lg'>Model</label>
                    <p>{vehicle.model}</p>
                    <label className='underline text-lg'>Fuel type</label>
                    <p>{vehicle.fuelType}</p>
                </div>
                <div className='flex flex-col mt-0 m-6'>                   
                    <label className='underline text-lg'>License</label>
                    <p>{vehicle.license}</p>
                    <label className='underline text-lg'>Kms</label>
                    <p>{vehicle.kms}</p>
                </div>
            </Link>
            <div className='flex self-end mb-2 mr-2'>
            <Button onClick={() => openDeleteVehicle(vehicle.id)}>Delete</Button>            
            </div>
            {vehicleToDelete && <DeleteVehicle onClose={closeDeleteVehicle} vehicleToDelete={vehicleToDelete} onDeleted={onDeleted} />}
        </div>
    </section >
}
