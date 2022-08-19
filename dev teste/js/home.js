$('#Usuario').click(function () {
    createPage('usuario/user.html');
});
$('#Permissao').click(function () {
    createPage('permissao/permissao.html');
});
$('#Grupo').click(function () {
    createPage('grupo/grupo.html');
});
$('#atribuirGrupo').click(function () {
    createPage('atribuirGrupo/atribuirGrupo.html');
});
$('#AtribuirPermissao').click(function () {
    createPage('Atribuirpermissao/AtribuirPermissao.html');
});
$('#Amostra').click(function () {
    createPage('amostra/amostra.html');
});
$('#Classificacao').click(function () {
    createPage('classificacao/classificacao.html');
});
$('#Armagem').click(function () {
    createPage('armazem/armazem.html');
});
$('#Cafe').click(function () {
    createPage('cafe/cafe.html');
});
$('#ucom').click(function () {
    createPage('ucom/ucom.html');
});
$('#sair').click(function () {
    mensagem = window.location = 'login.html';
});
function createPage(urlName) {
    $.get("views/" + urlName, function (view) {
        $('#containerGlobal').html(view);
    });
}