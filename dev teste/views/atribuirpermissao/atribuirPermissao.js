$(document).ready(function () {
    let pegarUsuarios = [];
    let permissaoUsuarios = [];
    let permissaoArray = "";
    let UUID = "";
    let grupo_Valor = '';
    let selectId = '';
    let valorAnterior = '';
    if (window.localStorage.getItem('usuario')) {
        pegarUsuarios = JSON.parse(window.localStorage.getItem('usuario'));
        if (window.localStorage.getItem('permissaoUsuario')) {
            permissaoUsuarios = JSON.parse(window.localStorage.getItem('permissaoUsuario'));
        };
        let html = '';
        let poderes = '';
        let control = true;

        pegarUsuarios.map((val) => {
            UUID = create_UUID();
            html += '<a style="" class="list-group-item list-group-item-action bloquearLink' + (control ? ' active' : '') + '"' +
                'id="grupos_' + UUID + '-list" data-toggle="list"' +
                'href="#list_' + UUID + '" role="tab" aria-controls="' + UUID + '">' + val.usuario + '</a>';

            if (permissaoUsuarios) {
                poderes += '<div class="tab-pane fade show' + (control ? ' active' : '') + '" id="list_' + UUID + '"' +
                    'role="tabpanel" aria-labelledby="list_' + UUID + '-list">';
                permissaoUsuarios.map((val2) => {
                    if (val2.usuario == val.usuario) {
                        UUIDPERMISSAO = create_UUID();
                        poderes += '<div id="selectDiv_' + UUIDPERMISSAO + '" class="row"><div class="col-5">' +
                            '<select id="selectId_' + UUIDPERMISSAO + '" class="form-control" disabled>' +
                            '<option value="editar" ' + (val2.permissao === "editar" ? 'selected' : '') + '>editar</option>' +
                            '<option value="excluir" ' + (val2.permissao === "excluir" ? 'selected' : '') + '>excluir</option>' +
                            '<option value="incluir" ' + (val2.permissao === "incluir" ? 'selected' : '') + '>incluir</option>' +
                            '<option value="visualizar" ' + (val2.permissao === "visualizar" ? 'selected' : '') + '>visualizar</option>' +
                            '</select></div >' +
                            '<div class="col-1 botaoum">' +
                            '<button class="btn btn-outline-primary editar" selectId="selectId_' + UUIDPERMISSAO + '" type="button data-toggle="tooltip" data-placement="top" title="Deletar opção ' + val2.permissao + '""><i class="las la-pen" style="font-size: 25px"></i></button>' +
                            '</div>' +
                            '<div class="col-1 botaodois">' +
                            '<button class="btn btn-outline-danger remover" removerDiv="selectDiv_' + UUIDPERMISSAO + '" selectId="selectId_' + UUIDPERMISSAO + '" type="button data-toggle="tooltip" data-placement="top" title="Deletar opção ' + val2.permissao + '""><i class="las la-trash-alt" style="font-size: 25px"></i></button>' +
                            '</div></div>';
                    };
                });
                poderes += '<div class="col-md-4 offset-md-6">' +
                    '<button class="btn btn-outline-primary adicionar" adicionar="list_' + UUID + '" type="button data-toggle=" tooltip="" data-placement="top" title="Deletar opção visualizar"> <i class="las la-plus" style="font-size: 25px"></i></button>' +
                    '</div>';
                poderes += '</div>';
            } else {
                poderes += '<div class="tab-pane fade show' + (control ? ' active' : '') + '" id="list_' + UUID + '"' +
                    'role="tabpanel" aria-labelledby="list_' + UUID + '-list">';
                poderes += '<div class="col-md-4 offset-md-6">' +
                    '<button class="btn btn-outline-primary adicionar" adicionar="list_' + UUID + '" type="button data-toggle=" tooltip="" data-placement="top" title="Deletar opção visualizar"> <i class="las la-plus" style="font-size: 25px"></i></button>' +
                    '</div>';
                poderes += '</div>';
            };
            control = false;
        });
        $('#list-tab').html(html);
        $('#nav-tabContent').html(poderes);
    };

    $('.tab-content').on('click', '.adicionar', function () {
        let adicionar = $(this).attr("adicionar");
        valorAnterior = "";
        UUID = create_UUID();
        $('#list-tab a').each(function (index) {
            if ($(this).hasClass('active')) {
                grupo_Valor = $(this).text();
            };
        });
        $('.remover').prop('disabled', true);
        $('.editar').prop('disabled', true);
        $('#sair').prop('disabled', true);
        $('.adicionar').hide();
        $('a').css("pointer-events", "none");
        $("#" + adicionar).prepend('<div class="row" id="editarEsseId_' + UUID + '"><div class="col-5">' +
            '<select id="selectId_' + UUID + '" class="form-control">' +
            '<option value="" data-default disabled selected></option>' +
            '<option value="editar">editar</option>' +
            '<option value="excluir">excluir</option>' +
            '<option value="incluir">incluir</option>' +
            '<option value="visualizar">visualizar</option>' +
            '</select></div >' +
            '<div class="col-1 botaoum">' +
            '<button class="btn btn-success confirmar" selectId="selectId_' + UUID + '" data-toggle="tooltip" data-placement="top"><i class="lar la-check-circle" style="font-size: 25px"></i></button>' +
            '</div>' +
            '<div class="col-1 botaodois">' +
            '<button class="btn btn-danger cancelar" removerDiv="editarEsseId_' + UUID + '" selectId="selectId_' + UUID + '" data-toggle="tooltip" data-placement="top"><i class="las la-ban" style="font-size: 25px"></i></button>' +
            '</div></div>');
    });

    $('.tab-content').on('click', '.cancelar', function () {
        let removerDiv = $(this).attr("removerDiv");
        $('#' + removerDiv).remove();
        $('.adicionar').removeAttr("style");
        $('a').css("pointer-events", "");
        $('.editar').prop('disabled', false);
        $('.remover').prop('disabled', false);
        $('#sair').prop('disabled', false);
    });

    $('.tab-content').on('click', '.confirmar', function () {
        if ($("#selectId_" + UUID + " option:selected").val() == "") {
            alert("Selecione uma permissão");
        } else {
            let selecionado = $("#selectId_" + UUID + " option:selected").val();
            $('#sair').prop('disabled', false);
            $('.remover').prop('disabled', false);
            $('.editar').prop('disabled', false);
            $(".confirmar").toggleClass('btn-success btn-outline-primary');
            $(".confirmar").html('<i class="las la-pen" style="font-size: 25px"></i>');
            $(".confirmar").toggleClass('confirmar editar');
            $(".cancelar").toggleClass('btn-danger btn-outline-danger');
            $(".cancelar").html('<i class="las la-trash-alt" style="font-size: 25px"></i>');
            $(".cancelar").toggleClass('cancelar remover');
            $("#selectId_" + UUID).prop('disabled', true);
            $('.adicionar').removeAttr("style");
            $('a').css("pointer-events", "");
            pegarUsuarios.map((val) => {
                if (val.usuario == grupo_Valor) {
                    if (permissaoUsuarios == "") {
                        permissaoArray = selecionado;
                    } else {
                        permissaoUsuarios.map((val2) => {
                            if (val2.usuario) {
                                permissaoArray = selecionado;
                            } else {
                                permissaoArray = selecionado;
                            };
                        });
                    };
                };
            });
            permissaoUsuarios.push({ "usuario": grupo_Valor, "permissao": permissaoArray });
            window.localStorage.setItem('permissaoUsuario', JSON.stringify(permissaoUsuarios));
            console.log(permissaoUsuarios);
        };
    });

    $('.tab-content').on('click', '.editar', function () {
        selectId = $(this).attr("selectId");
        $('#list-tab a').each(function (index) {
            if ($(this).hasClass('active')) {
                grupo_Valor = $(this).text();
            };
        });
        if ($(this).is(".btn-outline-primary")) {
            valorAnterior = $("#" + selectId + " option:selected").val();
            $('.remover').prop('disabled', true);
            $('.editar').prop('disabled', true);
            $('#sair').prop('disabled', true);
            $(this).prop('disabled', false);
            $('.adicionar').hide();
            $('a').css("pointer-events", "none");
            $(this).html('<i class="las la-check-double" style="font-size: 25px"></i>');
            $(this).toggleClass('btn-outline-primary btn-outline-success');
            $("#" + selectId).prop('disabled', false);
        } else {
            let i = 0;
            let confirmar = $("#" + selectId + " option:selected").val();
            $('.remover').prop('disabled', false);
            $('.editar').prop('disabled', false);
            $('#sair').prop('disabled', false);
            $('.adicionar').removeAttr("style");
            $('a').css("pointer-events", "");
            $(this).html('<i class="las la-pen" style="font-size: 25px"></i>');
            $(this).toggleClass('btn-outline-success btn-outline-primary');
            $("#" + selectId).prop('disabled', true);
            localStorage.removeItem('permissaoUsuario');
            permissaoUsuarios.map((val2) => {
                if (val2.usuario == grupo_Valor) {
                    if (val2.permissao == valorAnterior) {
                        permissaoUsuarios[i].permissao = confirmar;
                    };
                };
                i++;
            });
            window.localStorage.setItem('permissaoUsuario', JSON.stringify(permissaoUsuarios));
            console.log(permissaoUsuarios);
        };
    });

    $('.tab-content').on('click', '.remover', function () {
        let i = 0;
        let removerDiv = $(this).attr("removerDiv");
        selectId = $(this).attr("selectId");
        valorAnterior = $("#" + selectId + " option:selected").val();
        $('#list-tab a').each(function (index) {
            if ($(this).hasClass('active')) {
                grupo_Valor = $(this).text();
            };
        });
        $('#' + removerDiv).remove();
        localStorage.removeItem('grupoUsuario');
        permissaoUsuarios.map((val2) => {
            if (val2.usuario == grupo_Valor) {
                if (val2.permissao == valorAnterior) {
                    permissaoUsuarios.splice([i], 1);
                };
            };
            i++;
        });
        window.localStorage.setItem('permissaoUsuario', JSON.stringify(permissaoUsuarios));
    });

    $('.tab-content').on('change', 'select', function () {
        let selecionado = $(this).val();
        permissaoUsuarios.map((val) => {
            if (val.usuario == grupo_Valor) {
                if (val.permissao) {
                    if (val.permissao == selecionado) {
                        $("button[valor='" + valorAnterior + "']").removeClass('btn-outline-success');
                        $("button[valor='" + valorAnterior + "']").addClass('btn-outline-primary');
                        $("button[valor='" + valorAnterior + "']").html('<i class="las la-pen" style="font-size: 25px"></i>');
                        $("option[value='" + valorAnterior + "']", this).prop('selected', true);
                        alert("O " + grupo_Valor + " já tem esse permissão!");
                    };
                };
            };
        });
    });

    function create_UUID() {
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
});