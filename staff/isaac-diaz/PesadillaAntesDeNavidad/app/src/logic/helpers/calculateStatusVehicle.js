// import calculateMonthsToNextItv from "./calculateMonthsToNextItv"
// import calculateMonthsToNextCheckOil from './calculateMonthsToNextCheckOil'

import { MONTH_IN_MS } from "../../utils/constants"

export default function calculateStatusVehicle(nextCheckOilDate, nextCheckIvtDate) {
    // const color = level === 'problems' ? 'red' : level === 'warning' ? 'gold' : level === 'perfect' ? 'green' : 'undefined'

    // const monthsToNextItv = calculateMonthsToNextItv(nextCheckIvtDate)
    // const monthsToNextCheckOil = calculateMonthsToNextCheckOil(nextCheckOilDate)

    // if (monthsToNextItv <= 1 || monthsToNextCheckOil <= 1) {
    //     return 'problems'
    // } else if (monthsToNextItv <= 3 || monthsToNextCheckOil <= 3) {
    //     return 'warning'
    // } else if (monthsToNextItv > 3 || monthsToNextCheckOil > 3)
    //     return 'perfect'

    if (nextCheckIvtDate <= new Date(Date.now() + MONTH_IN_MS) || nextCheckOilDate < new Date(Date.now() + MONTH_IN_MS)) {
        return 'problems'
    } else if (nextCheckIvtDate <= new Date(Date.now() + MONTH_IN_MS * 3) || nextCheckOilDate <= new Date(Date.now() + MONTH_IN_MS * 3)) {
        return 'warning'
    } else {
        return 'perfect'
    }
}