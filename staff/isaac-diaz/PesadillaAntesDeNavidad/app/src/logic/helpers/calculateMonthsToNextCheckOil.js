import calculateNextCheckOil from './calculateNextCheckOil'

export default function calculateMonthsToNextCheckOil(nextOilCheckDate) {
    const now = new Date

    const nextCheckOilMonth = nextOilCheckDate.getMonth()
    const monthNow = now.getMonth()

    const monthsToNextCheckOil = nextCheckOilMonth - monthNow
    
    return monthsToNextCheckOil
}