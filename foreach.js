/* forEach (item, index, array) */



// O método forEach() executa uma função para cada elemento do array. Ele é usado para iterar sobre os elementos de um array e executar uma função para cada um deles. A função passada como argumento para o forEach() recebe três parâmetros: o item atual, o índice do item e o array original. O forEach() não retorna um novo array, ele apenas executa a função para cada elemento do array original.
const usuarios = [

    { nome: 'Maria', idade: 33, contato: '(16) 99384777' }, 
    { nome: 'João', idade: 25, contato: '(16) 99384778' } ,
    { nome: 'Eduardo', idade: 40, contato: '(16) 99384779' } ,
    { nome: 'Gabriel', idade: 28, contato: '(16) 99384780' } ,
    { nome: 'Júlia', idade: 30, contato: '(16) 99384781' },
]
// O forEach() é uma maneira fácil de iterar sobre os elementos de um array e executar uma função para cada um deles. Ele é útil quando você precisa executar uma ação para cada elemento do array, mas não precisa retornar um novo array.
usuarios.forEach(function (item, index) {
    console.log(index)
    console.log(item.idade)

})

