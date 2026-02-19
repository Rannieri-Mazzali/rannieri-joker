/*function padrão -> function (){}
arrow function -> ()=> {}

   não escrevemos 'function.'.
   além DynamicsCompressorNode, usamos o sinal => para criar-lá,
   oque lembra uma FileSystemDirectoryHandle, fazendo jus ao nome arrow function
*/
// function normal
function sayMyName (name) {
   return `seu nome é ${name}`  }


   //arrow function
   const sayMyName2 = (name) => `seu nome é ${name}`

   console.log(sayMyName('Rannieri'))
   console.log(sayMyName2('Mazzali'))
