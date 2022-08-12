var grupos = [];
var valorInput = '';
var editarBanco = '';
var valorAntigo = '';
$(document).ready(function () {
    var html = '';
    if (window.localStorage.getItem('grupo')) {
        grupos = JSON.parse(window.localStorage.getItem('grupo'));
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
        $('#excluir').remove();
        $('.adicionar').removeAttr("style");
    });

    $('#adicionarDiv').on('click', '.confirmar', function () {
        var valorConfirmar = $("#campo").val();
        if ($('#campo').val() == '') {
            alert('Por favor preencha o campo');
        } else {
            var control = true
            grupos.map((val) => {
                debugger;
                if (val.grupo == valorConfirmar) {
                    alert("Esse grupo já existe");
                    control = false
                }
            });
            if (control) {
                if ($(this).is(".btn-success")) {
                    valorInput = create_UUID();
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
                }
            }
        }
    });

    $('#adicionarDiv').on('click', '.editar', function () {
        editarBanco = $(this).attr('editarBanco');
        var valorInputLocal = $("#campoId_" + editarBanco).val();
        if ($("#campoId_" + editarBanco).val() == '') {
            alert('Por favor preencha o campo');
        } else {
            if ($(this).is(".btn-outline-primary")) {
                $(this).html('<i class="las la-check-double" style="font-size: 25px"></i>');
                $(this).toggleClass('btn-outline-primary btn-outline-success');
                $("#campoId_" + editarBanco).prop('disabled', false);
            } else {
                var i = 0;
                $(this).html('<i class="las la-pen" style="font-size: 25px"></i>');
                $(this).toggleClass('btn-outline-success btn-outline-primary');
                $("#campoId_" + editarBanco).prop('disabled', true);
                window.localStorage.clear();
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
        var i = 0;
        var removerDiv = $(this).attr('removerDiv');
        valorInput = $("#campoId_" + removerDiv).val();
        window.localStorage.clear();
        $('#' + removerDiv).remove();
        grupos.map((val) => {
            if (val.grupo == valorInput) {
                grupos.splice([i], 1)
            }
            i++;
        });
        window.localStorage.setItem('grupo', JSON.stringify(grupos));
    });
});

function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}