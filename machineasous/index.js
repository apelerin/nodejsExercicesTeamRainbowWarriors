const crypto = require("crypto")
const symbols = ["💘", "🌭", "🍺", "💸", "⛄", "🍆", "🍑", "😈"]

function probaCalc(nbrSymbols, nbrResult) {
    return (Math.pow(1 / nbrSymbols, nbrResult)) * 100
}

const rds = []
for (let i = 0; i <= 2; i++) {
    rds.push(crypto.randomInt(0, 7))
}

rds.forEach((element) => {
    process.stdout.write(symbols[element] + ' ')
})

console.log('\n' + probaCalc(symbols.length, rds.length))