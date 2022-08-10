var valorInput = '';
$(document).ready(function () {
    $('#adicionarDiv').on('click', '.adicionar', function () {
        $('.adicionar').hide();
        $('#adicionarDiv').prepend('<div id="excluir" class="list-group" id="list-tab" role="tablist">' +
            '<div class="row justify-content-center">' +
            '<div class="col-5">' +
            '<div class="input-group mb-3">' +
            '<input id="campo" class="form-control">' +
            '<div class="col-1">' +
            '<div id="buttonEditar" class="input-group-append">' +
            '<button class="btn btn-success confirmar" type="button"><i class="lar la-check-circle" style="font-size: 25px"></i></button>' +
            '</div></div>' +
            '<div class="col-1 offset-md-1">' +
            '<div id="buttonCancelar" class="input-group-append">' +
            '<button class="btn btn-danger cancelar" type="button"><i class="las la-ban" style="font-size: 25px"></button>' +
            '</div></div></div></div></div></div>');
    });

    $('#adicionarDiv').on('click', '.cancelar', function () {
        $('#excluir').remove();
        $('.adicionar').removeAttr("style");
    });

    $('#adicionarDiv').on('click', '.confirmar', function () {
        if ($('#campo').val() == '') {
            alert('Por favor preencha o campo');
        } else {
            if ($(this).is(".btn-success")) {
                $(this).html('<i class="las la-pen" style="font-size: 25px"></i>');
                $(this).toggleClass('btn-success btn-outline-primary');
                $(this).toggleClass('confirmar editar');
                $(".cancelar").html('<i class="las la-trash-alt" style="font-size: 25px"></i>');
                $(".cancelar").toggleClass('btn-danger btn-outline-danger');
                $(".cancelar").toggleClass('cancelar remover');
                $("#campo").prop('disabled', true);
                $('.adicionar').removeAttr("style");
                $('#campo').val()
            }
        }
    });

    $('#adicionarDiv').on('click', '.editar', function () {
        if ($('#campo').val() == '') {
            alert('Por favor preencha o campo');
        } else {
            if ($(this).is(".btn-outline-primary")) {
                $(this).html('<i class="las la-check-double" style="font-size: 25px"></i>');
                $(this).toggleClass('btn-outline-primary btn-outline-success');
                $("#campo").prop('disabled', false);
            } else {
                $(this).html('<i class="las la-pen" style="font-size: 25px"></i>');
                $(this).toggleClass('btn-outline-success btn-outline-primary');
                $("#campo").prop('disabled', true);
                valorInput = $('#campo').val();
                alert(valorInput);
            }
        }
    });

    $('#adicionarDiv').on('click', '.remover', function () {
        $('#excluir').remove();
    })
});