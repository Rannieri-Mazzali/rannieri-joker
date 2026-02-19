//const variavel = 'banana';
//console.log(variavel);

//function minhaFuncao() {
  //  console.log('Bem vindo Rannieri');
//}


// A função minhaFuncao é definida para imprimir a mensagem 'Bem vindo Rannieri' no console. Quando a função é chamada, ela executa o código dentro dela, que é a instrução console.log('Bem vindo Rannieri'), resultando na exibição da mensagem no console.
//minhaFuncao();    // (name = 'rannieri' )
function sayMyName (name) {
    console.log('Your name is ' + name);
}
// A função sayMyName é definida para receber um parâmetro chamado name. Quando a função é chamada com o argumento 'Rannieri', ela imprime a mensagem 'Your name is Rannieri' no console. O operador de concatenação (+) é usado para combinar a string 'Your name is ' com o valor do parâmetro name, resultando na mensagem completa que é exibida no console.
sayMyName('Rannieri');
sayMyName('Maria');
 sayMyName('João');
 

 
 function soma (value, value2) {
console.log(value + value2)

 }



 function somar(number1 = 40, number2= 50){
console.log (number1 + number2)

 }
 somar(40,60)


 const myNumber = 50

 function soma(number1 = myNumber, number2=30){

    console.log(number1 + number2)
 }
 
 // function void (vazia, não te retorna nada.)
 //function return, retorna um valor para quem chamou a função.


 //função que não responde
 
// const result = somar(20+50)
 //console.log(resultado+'resultado')

//função que reponde

function somar (value, value2) {
const result= value + value2
return result
}
const myResult= somar(80, 50)
 console.log(myResult + "resultado")



