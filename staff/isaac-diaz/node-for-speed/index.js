const STEP = 5
const FAKE_STEP = 15

const police = {
    icon: '🦼',

    x: 2
}

const thief = {
    icon: '🦽',

    x: 2 * STEP
}

const policeman = {
    icon: '🕵️‍♂️',

    x: 2
}

const trafficman = {
    icon: '🐱‍👤',

    x: 2 * STEP
}

let casicasi

let wasted

setInterval(() => {
    console.clear()

    if (!casicasi) {
        police.x += Math.round(Math.random() * FAKE_STEP)

        thief.x += Math.round(Math.random() * STEP)
    } else {
        console.log('='.repeat(100))
        console.log(' '.repeat(policeman.x) + policeman.icon)
        console.log(' '.repeat(trafficman.x) + trafficman.icon)
        console.log('='.repeat(100))
    }

    if (police.x >= thief.x) {
        console.log('police radio: the enemy scape with one box')
        console.log('trafficman: ouh men i am fu***d')
        casicasi = true
    }

    if (policeman.x >= trafficman.x) {
        console.log('WASTED')
    }
    
    render()
}, 200);

function render() {
    console.log('='.repeat(100))
    console.log(' '.repeat(police.x) + police.icon)
    console.log('- '.repeat(50))
    console.log(' '.repeat(thief.x) + thief.icon)
    console.log('='.repeat(100))
}



