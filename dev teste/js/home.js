$(document).ready(function () {
    $('#recursos').click(function () {
        createPage('recursos/recursos.html');
    });

    $('#usuario').click(function () {
        createPage('user/user.html');
    });

    $('#grupo').click(function () {
        createPage('grupo/grupo.html');
    });

    $('#permissao').click(function () {
        createPage('permissao/permissao.html');
    });

    $('#grupoPermissao').click(function () {
        createPage('grupoPermissao/grupoPermissao.html');
    });

    $('#atribuirGrupo').click(function () {
        createPage('atribuirGrupo/atribuirGrupo.html');
    });

    $('#atribuirPermissao').click(function () {
        createPage('Atribuirpermissao/AtribuirPermissao.html');
    });

    $('#amostra').click(function () {
        createPage('amostra/amostra.html');
    });

    $('#classificacao').click(function () {
        createPage('classificacao/classificacao.html');
    });

    $('#armagem').click(function () {
        createPage('armazem/armazem.html');
    });

    $('#cafe').click(function () {
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
});