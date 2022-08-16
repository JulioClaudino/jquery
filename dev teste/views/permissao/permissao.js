$(document).ready(function () {
    let gruposPermissao = [];
    let UUID = '';
    let grupo_Valor = '';
    let selectId = '';
    let valorAnterior = '';
    if (window.localStorage.getItem('grupo')) {
        gruposPermissao = JSON.parse(window.localStorage.getItem('grupo'));
        let html = '';
        let poderes = '';
        let control = true;

        gruposPermissao.map((val) => {
            UUID = create_UUID();
            html += '<a style="" class="list-group-item list-group-item-action bloquearLink' + (control ? ' active' : '') + '"' +
                'id="grupos_' + UUID + '-list" data-toggle="list"' +
                'href="#list_' + UUID + '" role="tab" aria-controls="' + UUID + '">' + val.grupo + '</a>';

            if (val.permissao) {
                poderes += '<div class="tab-pane fade show' + (control ? ' active' : '') + '" id="list_' + UUID + '"' +
                    'role="tabpanel" aria-labelledby="list_' + UUID + '-list">';
                val.permissao.map((val2) => {
                    UUIDPERMISSAO = create_UUID();
                    poderes += '<div id="selectDiv_' + UUIDPERMISSAO + '" class="row"><div class="col-5">' +
                        '<select id="selectId_' + UUIDPERMISSAO + '" class="form-control" disabled>' +
                        '<option value="editar" ' + (val2 === "editar" ? 'selected' : '') + '>editar</option>' +
                        '<option value="excluir" ' + (val2 === "excluir" ? 'selected' : '') + '>excluir</option>' +
                        '<option value="incluir" ' + (val2 === "incluir" ? 'selected' : '') + '>incluir</option>' +
                        '<option value="visualizar" ' + (val2 === "visualizar" ? 'selected' : '') + '>visualizar</option>' +
                        '</select></div >' +
                        '<div class="col-1 botaoum">' +
                        '<button class="btn btn-outline-primary editar" selectId="selectId_' + UUIDPERMISSAO + '" type="button data-toggle="tooltip" data-placement="top" title="Deletar opção ' + val2 + '""><i class="las la-pen" style="font-size: 25px"></i></button>' +
                        '</div>' +
                        '<div class="col-1 botaodois">' +
                        '<button class="btn btn-outline-danger remover" removerDiv="selectDiv_' + UUIDPERMISSAO + '" selectId="selectId_' + UUIDPERMISSAO + '" type="button data-toggle="tooltip" data-placement="top" title="Deletar opção ' + val2 + '""><i class="las la-trash-alt" style="font-size: 25px"></i></button>' +
                        '</div></div>';
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
        UUID = create_UUID();
        $('#list-tab a').each(function (index) {
            if ($(this).hasClass('active')) {
                grupo_Valor = $(this).text();
            };
        });

        $('.adicionar').hide();
        $('.bloquearLink').css("pointer-events", "none");
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

    $('.tab-content').on('change', 'select', function () {
    });

    $('.tab-content').on('click', '.confirmar', function () {
        if ($("#selectId_" + UUID + " option:selected").val() == "") {
            alert("Selecione uma permissão");
        } else {
            let selecionado = $("#selectId_" + UUID + " option:selected").val();
            $(".confirmar").toggleClass('btn-success btn-outline-primary');
            $(".confirmar").html('<i class="las la-pen" style="font-size: 25px"></i>');
            $(".confirmar").toggleClass('confirmar editar');
            $(".cancelar").toggleClass('btn-danger btn-outline-danger');
            $(".cancelar").html('<i class="las la-trash-alt" style="font-size: 25px"></i>');
            $(".cancelar").toggleClass('cancelar remover');
            $("#selectId_" + UUID).prop('disabled', true);
            $('.adicionar').removeAttr("style");
            $(".bloquearLink").css("pointer-events", "");
            gruposPermissao.map((val) => {
                if (val.grupo == grupo_Valor) {
                    if (val.permissao) {
                        val.permissao.push(selecionado);
                    } else {
                        val.permissao = [selecionado];
                    };
                };
            });
            window.localStorage.setItem('grupo', JSON.stringify(gruposPermissao));
            console.log(gruposPermissao);
        };
    });

    $('.tab-content').on('click', '.cancelar', function () {
       let removerDiv = $(this).attr("removerDiv");
        $('#' + removerDiv).remove();
        $('.adicionar').removeAttr("style");
        $(".bloquearLink").css("pointer-events", "");

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
            $(this).html('<i class="las la-check-double" style="font-size: 25px"></i>');
            $(this).toggleClass('btn-outline-primary btn-outline-success');
            $("#" + selectId).prop('disabled', false);
        } else {
            let i = 0;
            let j = 0;
            let confirmar = $("#" + selectId + " option:selected").val();
            $(this).html('<i class="las la-pen" style="font-size: 25px"></i>');
            $(this).toggleClass('btn-outline-success btn-outline-primary');
            $("#" + selectId).prop('disabled', true);
            gruposPermissao.map((val) => {
                if (val.grupo == grupo_Valor) {
                    val.permissao.map((val2) => {
                        if (val2 == valorAnterior) {
                            gruposPermissao[i].permissao[j] = confirmar;
                        };
                        j++;
                    });
                };
                i++;
            });
            window.localStorage.setItem('grupo', JSON.stringify(gruposPermissao));
            console.log(gruposPermissao);
        };
    });

    $('.tab-content').on('click', '.remover', function () {
        var i = 0;
        var j = 0;
        let removerDiv = $(this).attr("removerDiv");
        selectId = $(this).attr("selectId");
        valorAnterior = $("#" + selectId + " option:selected").val();
        $('#' + removerDiv).remove();
        gruposPermissao.map((val) => {
            if (val.grupo == grupo_Valor) {
                val.permissao.map((val2) => {
                    if (val2 == valorAnterior) {
                        debugger;
                        gruposPermissao[i].permissao.splice([j], 1);
                    };
                    j++;
                });
            };
            i++;
        });
        window.localStorage.setItem('grupo', JSON.stringify(gruposPermissao));
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

