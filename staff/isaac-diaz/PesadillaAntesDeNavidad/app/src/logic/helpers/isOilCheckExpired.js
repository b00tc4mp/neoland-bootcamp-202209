// si lastKms mas 10000 es >= a los kms actuales en los gasolina, caducada
// si lastKms mas 15000 es >= a los kms actuales en los diesel, caducada
// si ha pasado un año de la fecha de matriculacion, caducada
// si ha pasado un año desde la ultima revision, caducada

 function isOilCheckExpired(lastOilCheckDate, lastOilCheckKms, licenseDate, kms, fuelType) {
    const now = new Date
    const licenseYear = licenseDate.getFullYear()
    const lastOilCheckYear = lastOilCheckDate.getFullYear()

    if (fuelType === 'gasolina') {
        if (lastOilCheckKms + 10000 >= kms) {

            return true
        }
        else if (licenseYear + 1 <= now) {

            return true
        }
        else if (lastOilCheckYear + 1 <= now)

            return true
    } else if (fuelType === 'diesel') {
        if (lastOilCheckKms + 15000 >= kms) {

            return true
        }
        else if (licenseYear + 1 <= now) {

            return true
        }
        else if (lastOilCheckYear + 1 <= now)

            return true
    }

    return false
}