$(document).ready(function () {
    $('#adicionarDiv').on('click', '.editar', function () {
        if ($(this).is(".btn-outline-success")) {
            $(this).html('<i class="las la-pen" style="font-size: 25px"></i>');
            $(this).toggleClass('btn-outline-success btn-outline-primary');
            $("#campo").prop('disabled', true);

        } else {
            $(this).html('<i class="las la-check-double" style="font-size: 25px"></i>');
            $(this).toggleClass('btn-outline-primary btn-outline-success');
            $("#campo").prop('disabled', false);
        }
    });

    $('#adicionarDiv').on('click', '.excluir', function () {
        $('#excluir').remove();
    });

    $('#adicionarDiv').on('click', '.adicionar', function () {
        $('#adicionarDiv').prepend('<div id="excluir" class="list-group" id="list-tab" role="tablist">' +
            '<div class="row justify-content-center">' +
            '<div class="col-5">' +
            '<div class="input-group mb-3">' +
            '<input id="campo" class="form-control">' +
            '<div class="col-1">' +
            '<div id="buttonEditar" class="input-group-append">' +
            '<button class="btn btn-outline-success editar" type="button">' +
            '<i class="las la-check-double" style="font-size: 20px"></i>' +
            '</button>' +
            '</div></div>' +
            '<div class="col-1 offset-md-1">' +
            '<div id="buttonExcluir" class="input-group-append">' +
            '<button class="btn btn-outline-danger excluir" type="button">' +
            '<i class="las la-trash-alt" style="font-size: 20px"></i>' +
            '</button>' +
            '</div></div></div></div></div></div>');
    })
});