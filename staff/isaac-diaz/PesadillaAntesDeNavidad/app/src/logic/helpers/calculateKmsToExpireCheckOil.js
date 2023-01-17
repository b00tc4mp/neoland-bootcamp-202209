
export default function(lastkms, kms, fuelType) {
    if(fuelType === 'gasolina') {
        if(lastkms + 10000 <= kms + 1000)
        return true

        else if(lastkms + 10000 <= kms + 2000)
        return true

        else if(lastkms + 10000 <= kms)
        return true
    }

    else if(fuelType === 'diesel') {
        if(lastkms + 15000 <= kms + 1500)
        return true

        else if(lastkms + 15000 <= kms + 3000)
        return true

        else if(lastkms + 15000 <= kms)
        return true
    }
    else 
    return false
}