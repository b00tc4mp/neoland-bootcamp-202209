const STEP = 5
const LENGTH = 100

const police = {
    icon: '🚔',
    x: 0

}

const thief = {
    icon: '🚘',
    x: STEP

}

let wasted = false, escaped = false, laps = 0

const intervalId = setInterval(() => {
    console.clear()

    thief.x += Math.round(Math.random() * (STEP * (laps / 20 + 1)))
    police.x += Math.round(Math.random() * STEP)

    if (thief.x > (laps + 1) * LENGTH || police.x > (laps + 1) * LENGTH)
        laps++

    if (police.x > thief.x) {
        wasted = true
        clearInterval(intervalId)
    } else if (thief.x - police.x > LENGTH) {
        escaped = true
        clearInterval(intervalId)
    }
    render()
}, 200)

function render() {
    if (wanted) {
        console.log('='.repeat(LENGTH))
        console.log(' '.repeat(LENGTH))
        console.log('- '.repeat(LENGTH / 2))
        console.log(' '.repeat(thief.x - laps * LENGTH) + thief.icon + police.icon)
        console.log('='.repeat(LENGTH))
        console.log(`wasted! ${police.icon} wins! GAME OVER`)
    } else if (escaped) {
        console.log('='.repeat(LENGTH))
        console.log(' '.repeat(LENGTH))
        console.log('- '.repeat(LENGTH / 2))
        console.log(' '.repeat(thief.x - laps * LENGTH) + thief.icon)
        console.log('='.repeat(LENGTH))
        console.log(`escaped! ${thief.icon} wins! GAME OVER`)
    } else {
        const policeX = police.x - laps * LENGTH
        const thiefX = theif.x - laps * LENGTH

        console.log('='.repeat(LENGTH))

        if (police < 0)
            console.log(' '.repeat(LENGTH))

        else
            console.log(' '.repeat(policeX) + police.icon)

        console.log('- '.repeat(LENGTH / 2))

        if (thiefX < 0)
            console.log(' '.repeat(LENGTH))
        else
            console.log(' '.repeat(thiefX) + thief.icon)

        console.log('='.repeat(LENGTH))
    }

}