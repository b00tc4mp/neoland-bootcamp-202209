import deleteVehicle from '../logic/deleteVehicle'
import Button from './Button'

export default function DeleteVehicle({ onDeleted, onClose, vehicleToDelete }) {
    const confirmDeleteVehicle = event => {
        event.preventDefault()

        try {
            deleteVehicle(sessionStorage.token, vehicleToDelete)
                .then(() => {
                  
                    onDeleted()
                })
                .catch(error => alert(error.message))

        } catch (error) {
            alert(error.message)
        }
    }

    return <div className='bg-white shadow-xl shadow-red-600 fixed align-center w-80 h-40 flex flex-col justify-center items-center overflow-hidden' onClick={onClose}>
        <div className='flex flex-col items-center p-5 rounded-xl' onClick={(event) => event.stopPropagation()}>
            <p className='text-lg underline m-2 indent-2'> Confirm Delete </p>
            <div className='gap-4'>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={confirmDeleteVehicle}>Delete</Button>
            </div>
        </div>
    </div>
}