$(document).ready(function () {
    let grupos = [];
    let teajusteListaUsuarios = [];
    let valorInput = '';
    let editarBanco = '';
    let valorAntigo = '';
    let html = '';
    if (window.localStorage.getItem('grupo')) {
        grupos = JSON.parse(window.localStorage.getItem('grupo'));
        if (window.localStorage.getItem('grupoUsuario')) {
            teajusteListaUsuarios = JSON.parse(window.localStorage.getItem('grupoUsuario'));
        };
        grupos.map((val) => {
            valorInput = create_UUID();
            html += '<div id="' + valorInput + '" class="list-group" id="list-tab" role="tablist">' +
                '<div class="row justify-content-center">' +
                '<div class="col-5">' +
                '<div class="input-group mb-3">' +
                '<input id="campoId_' + valorInput + '" class="form-control" value="' + val.grupo + '" disabled>' +
                '<div class="col-1">' +
                '<div id="buttonEditar" class="input-group-append">' +
                '<button class="btn btn-outline-primary editar" editarBanco="' + valorInput + '" type="button"><i class="las la-pen" style="font-size: 25px"></i></button>' +
                '</div></div>' +
                '<div class="col-1 offset-md-1">' +
                '<div id="buttonCancelar" class="input-group-append">' +
                '<button class="btn btn-outline-danger remover" removerDiv="' + valorInput + '" type="button"><i class="las la-trash-alt" style="font-size: 25px"></i></button>' +
                '</div></div></div></div></div></div>'
        });
        html += '<div id="buttonAdicionar" class="col-md-6 offset-md-8"><button class="btn btn-outline-primary adicionar" type="button">' +
            '<i class="las la-plus" style="font-size: 20px"></i></button ></div>';
        $('#adicionarDiv').html(html);

    } else {
        html = '<div id="buttonAdicionar" class="col-md-6 offset-md-8"><button class="btn btn-outline-primary adicionar" type="button">' +
            '<i class="las la-plus" style="font-size: 20px"></i></button ></div>';
        $('#adicionarDiv').html(html);
    }

    $('#adicionarDiv').on('click', '.adicionar', function () {
        $('.remover').prop('disabled', true);
        $('.editar').prop('disabled', true);
        $('#sair').prop('disabled', true);
        $('a').css("pointer-events", "none");
        $('.adicionar').hide();
        $('#adicionarDiv').prepend('<div id="excluir" class="list-group" id="list-tab" role="tablist">' +
            '<div class="row justify-content-center">' +
            '<div class="col-5">' +
            '<div class="input-group mb-3">' +
            '<input id="campo" class="form-control">' +
            '<div class="col-1">' +
            '<div id="buttonEditar" class="input-group-append">' +
            '<button class="btn btn-success confirmar" editarBanco="teste" type="button"><i class="lar la-check-circle" style="font-size: 25px"></i></button>' +
            '</div></div>' +
            '<div class="col-1 offset-md-1">' +
            '<div id="buttonCancelar" class="input-group-append">' +
            '<button class="btn btn-danger cancelar" removerDiv="teste" type="button"><i class="las la-ban" style="font-size: 25px"></button>' +
            '</div></div></div></div></div></div>');
    });

    $('#adicionarDiv').on('click', '.cancelar', function () {
        $('.remover').prop('disabled', false);
        $('.editar').prop('disabled', false);
        $('#sair').prop('disabled', false);
        $('a').css("pointer-events", "");
        $('#excluir').remove();
        $('.adicionar').removeAttr("style");
    });

    $('#adicionarDiv').on('click', '.confirmar', function () {
        let valorConfirmar = $("#campo").val();
        if ($('#campo').val() == '') {
            alert('Por favor preencha o campo');
        } else {
            let control = true
            grupos.map((val) => {
                if (val.grupo == valorConfirmar) {
                    alert("Esse grupo já existe");
                    control = false
                }
            });
            if (control) {
                if ($(this).is(".btn-success")) {
                    valorInput = create_UUID();
                    $('a').css("pointer-events", "");
                    $('.remover').prop('disabled', false);
                    $('.editar').prop('disabled', false);
                    $('#sair').prop('disabled', false);
                    $(this).html('<i class="las la-pen" style="font-size: 25px"></i>');
                    $(this).toggleClass('btn-success btn-outline-primary');
                    $(this).toggleClass('confirmar editar');
                    $(this).attr('editarBanco', valorInput);
                    $(".cancelar").html('<i class="las la-trash-alt" style="font-size: 25px"></i>');
                    $(".cancelar").attr('removerDiv', valorInput);
                    $(".cancelar").toggleClass('btn-danger btn-outline-danger');
                    $(".cancelar").toggleClass('cancelar remover');
                    $("#campo").prop('disabled', true);
                    $('.adicionar').removeAttr("style");
                    $("#excluir").attr('id', valorInput);
                    $("#campo").attr('id', 'campoId_' + valorInput);
                    grupos.push({ 'grupo': $('#campoId_' + valorInput).val() });
                    window.localStorage.setItem('grupo', JSON.stringify(grupos));
                    console.log(grupos);
                }
            }
        }
    });

    $('#adicionarDiv').on('click', '.editar', function () {
        editarBanco = $(this).attr('editarBanco');
        let valorInputLocal = $("#campoId_" + editarBanco).val();
        if ($("#campoId_" + editarBanco).val() == '') {
            alert('Por favor preencha o campo');
        } else {
            if ($(this).is(".btn-outline-primary")) {
                $('.adicionar').hide();
                $('a').css("pointer-events", "none");
                $('.remover').prop('disabled', true);
                $('.editar').prop('disabled', true);
                $('#sair').prop('disabled', true);
                $(this).prop('disabled', false);
                $(this).html('<i class="las la-check-double" style="font-size: 25px"></i>');
                $(this).toggleClass('btn-outline-primary btn-outline-success');
                $("#campoId_" + editarBanco).prop('disabled', false);
            } else {
                let i = 0;
                $('.adicionar').removeAttr("style");
                $('a').css("pointer-events", "");
                $('.remover').prop('disabled', false);
                $('.editar').prop('disabled', false);
                $('#sair').prop('disabled', false);
                $(this).html('<i class="las la-pen" style="font-size: 25px"></i>');
                $(this).toggleClass('btn-outline-success btn-outline-primary');
                $("#campoId_" + editarBanco).prop('disabled', true);
                localStorage.removeItem('grupo');
                grupos.map((val) => {
                    if (val.grupo == valorAntigo) {
                        grupos[i].grupo = valorInputLocal;
                    }
                    i++;
                });
                window.localStorage.setItem('grupo', JSON.stringify(grupos));
            }
        }
        valorAntigo = $("#campoId_" + editarBanco).val();
    });

    $('#adicionarDiv').on('click', '.remover', function () {
        let i = 0;
        let j = 0;
        let removerDiv = $(this).attr('removerDiv');
        valorInput = $("#campoId_" + removerDiv).val();
        localStorage.removeItem('grupo');
        $('#' + removerDiv).remove();
        grupos.map((val) => {
            if (val.grupo == valorInput) {
                grupos.splice([i], 1)
            }
            i++;
        });
        // if (teajusteListaUsuarios.length !== 0) {
        //     localStorage.removeItem('grupoUsuario');
        //     teajusteListaUsuarios.map((val) => {
        //         if (val.grupo == valorInput) {
        //             teajusteListaUsuarios.splice([j], 1);
        //         };
        //         j++;
        //     });
        //     window.localStorage.setItem('grupoUsuario', JSON.stringify(teajusteListaUsuarios));
        // };
        window.localStorage.setItem('grupo', JSON.stringify(grupos));
    });

    function create_UUID() {
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
});