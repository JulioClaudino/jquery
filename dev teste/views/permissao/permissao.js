const data = [{
    grupo: "TI",
    permissao: [
        "editar", "excluir", "incluir", "visualizar"
    ]
},
{
    grupo: "Contabilidade",
    permissao: [
        "visualizar"
    ]
},
{
    grupo: "Diretoria",
    permissao: [
        "editar", "incluir", "visualizar"
    ]
}];
$(document).ready(function () {
    var valorAnterior = '';
    var html = '';
    var poderes = '';
    var control = true;

    data.map((val) => {
        html += '<a class="list-group-item list-group-item-action' + (control ? ' active' : '') + '"' +
            'id="list-' + val.grupo + '-list" data-toggle="list"' +
            'href="#list-' + val.grupo + '" role="tab" aria-controls="' + val.grupo + '">' + val.grupo + '</a>'
        control = false;
    })
    $('#list-tab').html(html);

    control = true;
    data.map((val) => {
        poderes += '<div class="tab-pane fade show' + (control ? ' active' : '') + '" id="list-' + val.grupo + '"' +
            'role="tabpanel" aria-labelledby="list-' + val.grupo + '-list">'
        val.permissao.map((val2) => {
            poderes += '<div class="row"><div class="col-5">' +
                '<select id="' + val.grupo + '_' + val2 + '" class="form-control" name="' + val.grupo + '_' + val2 + '" disabled>' +
                '<option value="editar" ' + (val2 === "editar" ? 'selected' : '') + '>editar</option>' +
                '<option value="excluir" ' + (val2 === "excluir" ? 'selected' : '') + '>excluir</option>' +
                '<option value="incluir" ' + (val2 === "incluir" ? 'selected' : '') + '>incluir</option>' +
                '<option value="visualizar" ' + (val2 === "visualizar" ? 'selected' : '') + '>visualizar</option>' +
                '</select></div >' +
                '<div class="col-1 botaoum">' +
                '<button class="btn btn-outline-primary editar" valor="' + val.grupo + '_' + val2 + '" type="button data-toggle="tooltip" data-placement="top" title="Deletar opção ' + val2 + '""><i class="las la-pen" style="font-size: 25px"></i></button>' +
                '</div>' +
                '<div class="col-1 botaodois">' +
                '<button class="btn btn-outline-danger" type="button data-toggle="tooltip" data-placement="top" title="Deletar opção ' + val2 + '""><i class="las la-trash-alt" style="font-size: 25px"></i></button>' +
                '</div></div>';
        })
        poderes += '</div>';
        control = false;
    })
    $('#nav-tabContent').html(poderes);

    $('.editar').click(function (event) {
        valorAnterior = $(this).attr("valor");
        if ($(this).is(".btn-outline-primary")) {
            $(this).html('<i class="las la-check-double" style="font-size: 25px"></i>');
            $(this).toggleClass('btn-outline-primary btn-outline-success');
            $("#" + valorAnterior).prop('disabled', false);
        } else {
            var i = 0;
            var j = 0;
            var valAntQue = valorAnterior.split("_");
            var confirmar = $("#" + valorAnterior + " option:selected").val();
            $(this).html('<i class="las la-pen" style="font-size: 25px"></i>');
            $(this).toggleClass('btn-outline-success btn-outline-primary');
            $("#" + valorAnterior).prop('disabled', true);
            data.map((val) => {
                if (val.grupo == valAntQue[0]) {
                    val.permissao.map((val2) => {
                        debugger;
                        if (val2 == valAntQue[1]) {
                            data[i].permissao[j] = confirmar;
                        }
                        j++;
                    })
                }
                i++;
            });
        }
    });

    $('select').change(function () {
        var selecionado = $(this).val();
        var valAntQue = valorAnterior.split("_");
        data.map((val) => {
            if (val.grupo == valAntQue[0]) {
                val.permissao.map((val2) => {
                    if (val2 == selecionado) {
                        $("button[valor='" + valorAnterior + "']").toggleClass('btn-outline-success btn-outline-primary');
                        $("button[valor='" + valorAnterior + "']").html('<i class="las la-pen" style="font-size: 25px"></i>');
                        $(this).prop('disabled', true);
                        $("option[value='" + valAntQue[1] + "']", this).prop('selected', true);
                        alert("A função " + selecionado + " já está cadastrada nesse grupo!");
                    }
                })
            }
        })
    });
});