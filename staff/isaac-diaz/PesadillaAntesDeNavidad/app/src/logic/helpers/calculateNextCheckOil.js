/**
 * 
 * @example
 * ```js
 * const data = calculateNextCheckOilDate(...)
 * 
 * const { nextOilCheckDate, nextOilCheckKms } = data
 * ``
 * 
 * @param {*} lastOilCheckKms 
 * @param {*} lastOilCheckDate 
 * @param {*} licenseDate 
 * @param {*} kms 
 * @param {*} fuelType 
 * @returns 
 */
 export default function calculateNextCheckOil(lastOilCheckKms = undefined, lastOilCheckDate = undefined, licenseDate, fuelType) {
    const licenseDay = licenseDate.getDate()
    const licenseMonth = licenseDate.getMonth()
    const licenseYear = licenseDate.getFullYear()
    const lastInspectDay = lastOilCheckDate && lastOilCheckDate.getDate()
    const lastInspectMonth = lastOilCheckDate && lastOilCheckDate.getMonth()
    const lastInspectYear = lastOilCheckDate && lastOilCheckDate.getFullYear()

    if (fuelType === 'gasolina') {
        if (!lastOilCheckDate) {

            const firstOilCheckYear = licenseYear + 1

            const nextOilCheckDate = new Date(firstOilCheckYear, licenseMonth, licenseDay)
            const nextOilCheckKms = 10000 

            return { nextOilCheckDate, nextOilCheckKms }

        } else if (lastOilCheckDate) {


            const nextOilCheckYear = lastInspectYear + 1
            const nextOilCheckDate = new Date(nextOilCheckYear, lastInspectMonth, lastInspectDay)
            const nextOilCheckKms = lastOilCheckKms + 10000

            return { nextOilCheckDate, nextOilCheckKms }
        }
    }

    if (fuelType === 'diesel') {
        if (!lastOilCheckDate) {

            const firstInspection = licenseYear + 1

            const nextOilCheckDate = new Date(firstInspection, licenseMonth, licenseDay)
            const nextKms = 15000

            return { nextOilCheckDate, nextKms }

        } else {

            const nextOilCheck = lastInspectYear + 1
            const nextOilCheckDate = new Date(nextOilCheck, lastInspectMonth, lastInspectDay)
            const nextKms = lastOilCheckKms + 15000

            return { nextOilCheckDate, nextKms }
        }
    }
}






// if (status < 1 || kms > lastKms + 14500 && gas === 'diesel') {

//     return red

// } else if (status < 1 || kms > lastKms + 9500 && gas === 'gasolina') {

//     return red

// } else if (status < 3 || kms > lastKms + 2500 && gas === 'diesel') {

//     return yellow

// } else if (status < 3 || kms > lastKms + 2500 && gas === 'gasolina') {

//     return yellow

// } else
//     return green

