const cart = [10, 244, 99, 2, 20, 33, 250]
let finalValue = 0

function calcularDesconto(produto, disconto) {
    const result = (produto * disconto) / 100

    return result


}


cart.forEach(value => {
    finalValue = finalValue + value

    if (value > 30) {
        const disconto = calcularDesconto(value, 10)

        finalValue = finalValue + (value - disconto)

    }

});


console.log (finalValue)
