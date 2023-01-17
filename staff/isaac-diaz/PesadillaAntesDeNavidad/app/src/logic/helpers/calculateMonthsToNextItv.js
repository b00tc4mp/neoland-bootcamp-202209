
export default function calculateMonthsToNextItv(nextItvDate) {
    const now = new Date

    const nextItvMonth = nextItvDate.getMonth()
    const monthNow = now.getMonth()

    const monthsToNextItv = nextItvMonth - monthNow

    return monthsToNextItv

    // TODO move to front
    // if (status <= 1) {
    //     return <TarjetVehicle className='border-red-600' />
    // } else if (status <= 3) {
    //     return <TarjetVehicle className='border-yellow-500' />
    // } else if (status > 3)
    // return <TarjetVehicle className='border-green-500' />
}