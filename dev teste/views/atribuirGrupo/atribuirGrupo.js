$(document).ready(function () {
    let grupos = [];
    let pegarUsuarios = [];
    let valorAnterior = ""
    let UUID = "";
    let grupo_Valor = "";
    let selectId = "";
    if (window.localStorage.getItem('grupo')) {
        grupos = JSON.parse(window.localStorage.getItem('grupo'));
        if (window.localStorage.getItem('usuario')) {
            pegarUsuarios = JSON.parse(window.localStorage.getItem('usuario'));
        };
        let html = '';
        let poderes = '';
        let control = true;

        grupos.map((val) => {
            UUID = create_UUID();
            html += '<a style="" class="list-group-item list-group-item-action bloquearLink' + (control ? ' active' : '') + '"' +
                'id="grupos_' + UUID + '-list" data-toggle="list"' +
                'href="#list_' + UUID + '" role="tab" aria-controls="' + UUID + '">' + val.grupo + '</a>';

            if (val.usuario) {
                poderes += '<div class="tab-pane fade show' + (control ? ' active' : '') + '" id="list_' + UUID + '"' +
                    'role="tabpanel" aria-labelledby="list_' + UUID + '-list">';
                val.usuario.map((val2) => {
                    UUIDPERMISSAO = create_UUID();
                    poderes += '<div id="selectDiv_' + UUIDPERMISSAO + '" class="row"><div class="col-5">' +
                        '<select id="selectId_' + UUIDPERMISSAO + '" class="form-control" disabled>';
                    pegarUsuarios.map((val3) => {
                        poderes += '<option value="' + val3.usuario + '" ' + (val3.usuario === val2 ? 'selected' : '') + '>' + val3.usuario + '</option>';
                    });
                    poderes += '</select></div >' +
                        '<div class="col-1 botaoum">' +
                        '<button class="btn btn-outline-primary editar" selectId="selectId_' + UUIDPERMISSAO + '" type="button data-toggle="tooltip" data-placement="top" title="Deletar opção ' + val2.usuario + '""><i class="las la-pen" style="font-size: 25px"></i></button>' +
                        '</div>' +
                        '<div class="col-1 botaodois">' +
                        '<button class="btn btn-outline-danger remover" removerDiv="selectDiv_' + UUIDPERMISSAO + '" selectId="selectId_' + UUIDPERMISSAO + '" type="button data-toggle="tooltip" data-placement="top" title="Deletar opção ' + val2.usuario + '""><i class="las la-trash-alt" style="font-size: 25px"></i></button>' +
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
        if (pegarUsuarios.length === 0) {
            alert("Não tem usuarios cadastrados.")
        } else {
            let adicionar = $(this).attr("adicionar");
            valorAnterior = "";
            UUID = create_UUID();
            $('#list-tab a').each(function (index) {
                if ($(this).hasClass('active')) {
                    grupo_Valor = $(this).text();
                };
            });
            let selectUsuarios = '<div class="row" id="editarEsseId_' + UUID + '"><div class="col-5"><select id="selectId_' + UUID + '" class="form-control"><option value="" data-default disabled selected></option>';
            pegarUsuarios.map((val2) => {
                selectUsuarios += '<option value="' + val2.usuario + '">' + val2.usuario + '</option>';
            });
            selectUsuarios += '</select></div >' +
                '<div class="col-1 botaoum">' +
                '<button class="btn btn-success confirmar" selectId="selectId_' + UUID + '" data-toggle="tooltip" data-placement="top"><i class="lar la-check-circle" style="font-size: 25px"></i></button>' +
                '</div>' +
                '<div class="col-1 botaodois">' +
                '<button class="btn btn-danger cancelar" removerDiv="editarEsseId_' + UUID + '" selectId="selectId_' + UUID + '" data-toggle="tooltip" data-placement="top"><i class="las la-ban" style="font-size: 25px"></i></button>' +
                '</div></div>';
            $('.remover').prop('disabled', true);
            $('.editar').prop('disabled', true);
            $('#sair').prop('disabled', true);
            $('.adicionar').hide();
            $('a').css("pointer-events", "none");
            $("#" + adicionar).prepend(selectUsuarios);
        };
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
            alert("Selecione um usuario");
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
            grupos.map((val) => {
                if (val.grupo == grupo_Valor) {
                    if (!val.usuario) {
                        val.usuario = [selecionado];
                    } else {
                        val.usuario.push(selecionado);
                    };
                };
            });
            window.localStorage.setItem('grupo', JSON.stringify(grupos));
            console.log(grupos);
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
            let j = 0;
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
            grupos.map((val) => {
                if (val.grupo == grupo_Valor) {
                    val.usuario.map((val2) => {
                        if (val2 == valorAnterior) {
                            grupos[i].usuario[j] = confirmar;
                        };
                        j++;
                    });
                };
                i++;
            });
            window.localStorage.setItem('grupo', JSON.stringify(grupos));
            console.log(grupos);
        };
    });

    $('.tab-content').on('click', '.remover', function () {
        let j = 0;
        let i = 0;
        let removerDiv = $(this).attr("removerDiv");
        selectId = $(this).attr("selectId");
        valorAnterior = $("#" + selectId + " option:selected").val();
        $('#' + removerDiv).remove();
        $('#list-tab a').each(function (index) {
            if ($(this).hasClass('active')) {
                grupo_Valor = $(this).text();
            };
        });
        grupos.map((val) => {
            if (val.grupo == grupo_Valor) {
                val.usuario.map((val2) => {
                    if (val2 == valorAnterior) {
                        grupos[i].usuario.splice([j], 1);
                    };
                    j++;
                });
            };
            i++;
        });
        window.localStorage.setItem('grupo', JSON.stringify(grupos));
        console.log(grupos);
    });

    $('.tab-content').on('change', 'select', function () {
        let selecionado = $(this).val();
        grupos.map((val) => {
            if (val.grupo == grupo_Valor) {
                if (val.usuario) {
                    val.usuario.map((val2) => {
                        if (val2 == selecionado) {
                            $("button[valor='" + valorAnterior + "']").removeClass('btn-outline-success');
                            $("button[valor='" + valorAnterior + "']").addClass('btn-outline-primary');
                            $("button[valor='" + valorAnterior + "']").html('<i class="las la-pen" style="font-size: 25px"></i>');
                            $("option[value='" + valorAnterior + "']", this).prop('selected', true);
                            alert(selecionado + " já pertence a esse grupo!");
                        };
                    });
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