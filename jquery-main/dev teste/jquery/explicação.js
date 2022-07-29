//cria uma variavel nome que não pode ser alterado
const nome = 'julio'

//var ou let cria uma variavel que pode ser alterado
var divida = 20

//vai para o console do site(inspecionar)
console.log

//criar uma função
function nomedafunção() {
    //aqui ficara os comandos
    var email = $('#exampleInputEmail1').val();
    var senha = $('#exampleInputPassword1').val();
    //retorna os valores
    return 'email: ' + email + '<hr> senha: ' + senha;
}

//parar chamar um function
console.log(nomedafunção())