class Pokemon extends Shape {
    constructor(icon, name, hash) {
        super()
        // this.life = 5
        this.name = name
        this.icon = icon
    }

    render() {
        this.container.innerText = this.icon
        
        super.render()
    }
    

    talk() {
        console.log(`'Me llamo ' ${name} + '. ' ${hash}`)
    }

    // status(level > 10) {
    //     live = (level * 10)
    //     level = 6
    //     attack = (level * 2)
    //     // exp = ??

     // status(level =< 10 && level > 20) {
    //     live = (level * 15)
    //     level = 6
    //     attack = (level * 2.5)
    //     // exp = ??

    // }
    
    // accion.attack() {
        //normal.attack
        //flameTrower.attack
        // }

}

// class Fire extends Pokemon {
//     constructor()

//     flametrower(enemy) {
//         if (enemy instanceof Water) {
//             enemy.life -= 0.5
//         } else if (enemy instanceof Plant) {
//             enemy.life -= 2
//         } else {
//             enemy.life -= 1
//         }
//     } 
//     // super()
// }



// class Water extends Pokemon {
//     constructor()

//     flametrower(enemy) {
//         if (enemy instanceof Plant) {
//             enemy.life -= 0.5
//         } else if (enemy instanceof Fire) {
//             enemy.life -= 2
//         } else {
//             enemy.life -= 1
//         }
//     } 
//     // super()
// }



// class Plant extends Pokemon {
//     constructor()
//     flametrower(enemy) {
//         if (enemy instanceof Water) {
//             enemy.life -= 0.5
//         } else if (enemy instanceof Plant) {
//             enemy.life -= 2
//         } else {
//             enemy.life -= 1
//         }
//     } 
//        // super()
// }



const char = new Pokemon('🔥')
char.name = 'Charmander'
char.hash = 'char char'
// char.talk()
// char = instanceof Fire
char.move(250, 250)
char.render()
// char.talk() 
//     console.log(`${hash} + ${nombre}`)


const bulba = new Pokemon('🌱')
bulba.im
bulba.name = 'bulbajuani'
bulba.hash = 'bulba bulba'
//bulba.talk()
// bulba = instanceof Plant
bulba.move(370, 100)
bulba.render()

const squirt = new Pokemon('💧')
squirt.name = 'Squirtle'
squirt.hash = 'sqüero....'
//squirt.talk()
// squirt = instanceof Water
squirt.move(100, 100)
squirt.render()

