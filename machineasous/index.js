const crypto = require("crypto")
const symbols = ["💘", "🌭", "🍺", "💸", "⛄", "🍆", "🍑", "😈"]
const allEqual = arr => arr.every(val => val === arr[0]);

function probaCalc(nbrBonTirage, nbrTirage) {
    return (nbrBonTirage / nbrTirage) * 100
}

let rds = []
let nbrGoodTirage = 0
let nbrTirage = 0

while(nbrTirage < 10000000) {
    for (let i = 0; i <= 2; i++) {
        rds.push(crypto.randomInt(0, 8))
    }

    //rds.forEach((element) => {
    //    process.stdout.write(symbols[element] + ' ')
    //})

    if (allEqual(rds)) {
        nbrGoodTirage++
    }

    rds = []
    nbrTirage++
}
console.log(nbrGoodTirage)
console.log(probaCalc(nbrGoodTirage, nbrTirage))
