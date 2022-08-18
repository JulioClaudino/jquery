$(document).ready(function () {
    let listaUsuarios = [];
    let grupoUsuarios = [];
    let pegarUsuarios = [];
    let tornarArray = "";
    let UUID = '';
    let valorAnterior = '';
    if (window.localStorage.getItem('grupo')) {
        pegarUsuarios = JSON.parse(window.localStorage.getItem('usuario'));
        grupoUsuarios = JSON.parse(window.localStorage.getItem('grupo'));
        let html = '';
        let poderes = '';
        let control = true;

        grupoUsuarios.map((val) => {
            UUID = create_UUID();
            html += '<a style="" class="list-group-item list-group-item-action bloquearLink' + (control ? ' active' : '') + '"' +
                'id="grupos_' + UUID + '-list" data-toggle="list"' +
                'href="#list_' + UUID + '" role="tab" aria-controls="' + UUID + '">' + val.grupo + '</a>';

            if (listaUsuarios) {
                poderes += '<div class="tab-pane fade show' + (control ? ' active' : '') + '" id="list_' + UUID + '"' +
                    'role="tabpanel" aria-labelledby="list_' + UUID + '-list">';
                listaUsuarios.map((val2) => {
                    UUIDPERMISSAO = create_UUID();
                    poderes += '<div id="selectDiv_' + UUIDPERMISSAO + '" class="row"><div class="col-5">' +
                        '<select id="selectId_' + UUIDPERMISSAO + '" class="form-control" disabled>' +
                        '<option value="' + val2.usuario + '" ' + (val2.usuario === val2.usuario ? 'selected' : '') + '>' + val2.usuario + '</option>' +
                        '</select></div >' +
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
            grupoUsuarios.map((val) => {
                debugger;
                if (val.grupo == grupo_Valor) {
                    if (listaUsuarios == "") {
                        tornarArray = [selecionado];
                    } else {
                        listaUsuarios.map((val2) => {
                            if (val2.usuario) {
                                val2.usuario.push(selecionado);
                            } else {
                                val2.usuario = [selecionado];
                            };
                        });
                    };
                };
            });
            listaUsuarios.push({ "usuario": tornarArray });
            window.localStorage.setItem('grupoUsuario', JSON.stringify(listaUsuarios));
            console.log(listaUsuarios);
        };
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