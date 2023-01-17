// import updateVehicle from '../logic/updateVehicle'
// import Button from './Button'

// export default function({ onEdited, onClose, vehicleToEdited }) {
//     const confirmEditVehicle = event => {
//         event.preventDefault()

//         try{
//             updateVehicle(sessionStorage.token, vehicleToEdited)
//                 .then(() => {
//                     onEdited()
//                 })
//                 .catch(error => alert(error.message))
//         } catch(error) {
//             alert(error.message)
//         }
//     }

//     return <div className='bg-white shadow-xl shadow-blue-600 fixed align-center w-80 h-40 flex flex-col justify-center items-center overflow-hidden' onClick={onClose}>
//         <div className='flex flex-col items-center p-5 rounded-xl' onClick={(event) => event.stopPropagation()}>
//             <p> Confirm new data </p>
//             <div>
//                 <Button onClick={onClose}>Close</Button>
//                 <Button onClick={confirmEditVehicle}>Edit</Button>
//             </div>
//         </div>
//     </div>
// }