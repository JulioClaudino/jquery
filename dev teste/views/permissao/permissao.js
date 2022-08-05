var dataVer = true;
if (dataVer) {
    data = [{
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
    dataVer = false;
}
var valorAnterior = '';
var grupo_Valor = '';
var selecionado = '';
var valAntQue = '';
$(document).ready(function () {
    var html = '';
    var poderes = '';
    var control = true;

    data.map((val) => {
        html += '<a style="" class="list-group-item list-group-item-action bloquearLink' + (control ? ' active' : '') + '"' +
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
            poderes += '<div class="row ' + val.grupo + '_' + val2 + '"><div class="col-5">' +
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
                '<button class="btn btn-outline-danger remover" valorRemover="' + val.grupo + '_' + val2 + '" adicionar="list-' + val.grupo + '" remover="' + val.grupo + '" bloquearlista="list-' + val.grupo + '-list" type="button data-toggle="tooltip" data-placement="top" title="Deletar opção ' + val2 + '""><i class="las la-trash-alt" style="font-size: 25px"></i></button>' +
                '</div></div>';
        })
        poderes += '<div class="col-md-4 offset-md-6">' +
            '<button class="btn btn-outline-primary adicionar" adicionar="list-' + val.grupo + '" id="adicionar_' + val.grupo + '" type="button data-toggle=" tooltip="" data-placement="top" title="Deletar opção visualizar"> <i class="las la-plus" style="font-size: 25px"></i></button>' +
            '</div>'
        poderes += '</div>';
        control = false;
    })
    $('#nav-tabContent').html(poderes);

    $('.tab-content').on('click', '.editar', function (event) {
        valorAnterior = $(this).attr("valor");
        if ($(this).is(".btn-outline-primary")) {
            $(this).html('<i class="las la-check-double" style="font-size: 25px"></i>');
            $(this).toggleClass('btn-outline-primary btn-outline-success');
            $("#" + valorAnterior).prop('disabled', false);
        } else {
            var i = 0;
            var j = 0;
            valAntQue = valorAnterior.split("_");
            var confirmar = $("#" + valorAnterior + " option:selected").val();
            $(this).html('<i class="las la-pen" style="font-size: 25px"></i>');
            $(this).toggleClass('btn-outline-success btn-outline-primary');
            $("#" + valorAnterior).prop('disabled', true);
            data.map((val) => {
                if (val.grupo == valAntQue[0]) {
                    val.permissao.map((val2) => {
                        if (val2 == valAntQue[1]) {
                            data[i].permissao[j] = confirmar;
                        }
                        j++;
                    })
                }
                i++;
            });
            console.log(data)
        }
    });

    $('select').change(function () {
        var selecionado = $(this).val();
        valAntQue = valorAnterior.split("_");
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

    $('.remover').click(function () {
        var i = 0;
        var j = 0;
        valorAnterior = $(this).attr("valorRemover");
        valAntQue = valorAnterior.split("_");
        $('.' + valorAnterior).remove();
        data.map((val) => {
            if (val.grupo == valAntQue[0]) {
                val.permissao.map((val2) => {
                    if (val2 == valAntQue[1]) {
                        data[i].permissao.splice([j], 1)
                    }
                    j++;
                })
            }
            i++;
        });
    });

    $('.adicionar').click(function () {
        $('#list-tab a').each(function (index) {
            if ($(this).hasClass('active')) {
                grupo_Valor = $(this).text();
            }
        });
        var adicionar = $(this).attr("adicionar");
        valAntQue = "teste"

        $('.adicionar').hide();
        $('.bloquearLink').css("pointer-events", "none");
        $("#" + adicionar).prepend('<div class="row" id="adicionarDiv"><div class="col-5">' +
            '<select id="editarEsseId_' + grupo_Valor + '" class="form-control" name="' + grupo_Valor + '">' +
            '<option value="" data-default disabled selected></option>' +
            '<option value="editar">editar</option>' +
            '<option value="excluir">excluir</option>' +
            '<option value="incluir">incluir</option>' +
            '<option value="visualizar">visualizar</option>' +
            '</select></div >' +
            '<div class="col-1 botaoum">' +
            '<button class="btn btn-success confirmar" valor="' + grupo_Valor + '" data-toggle="tooltip" data-placement="top"><i class="lar la-check-circle" style="font-size: 25px"></i></button>' +
            '</div>' +
            '<div class="col-1 botaodois">' +
            '<button class="btn btn-danger cancelar" cancelar="' + grupo_Valor + '" data-toggle="tooltip" data-placement="top"><i class="las la-ban" style="font-size: 25px"></i></button>' +
            '</div></div>');
        controleCancelar();
    });


});

function controleCancelar() {
    $('.tab-content').on('click', '.cancelar', function () {
        $('#adicionarDiv').remove();
        $('.adicionar').removeAttr("style");
        $(".bloquearLink").css("pointer-events", "");

    });

    $('.tab-content').on('click', '.confirmar', function () {
        if (selecionado == "") {
            alert("Selecione uma permissão");
        } else {
            $(".confirmar").toggleClass('btn-success btn-outline-primary');
            $(".confirmar").html('<i class="las la-pen" style="font-size: 25px"></i>');
            $(".confirmar").toggleClass('confirmar editar');
            $(".cancelar").toggleClass('btn-danger btn-outline-danger');
            $(".cancelar").html('<i class="las la-trash-alt" style="font-size: 25px"></i>');
            $(".cancelar").toggleClass('cancelar removerNovo');
            $("#editarEsseId_" + grupo_Valor).prop('disabled', true);
            $('.adicionar').removeAttr("style");
            $(".bloquearLink").css("pointer-events", "");
            var i = 0;
            var j = 0;
            data.map((val) => {
                if (val.grupo == grupo_Valor) {
                    val.permissao.map((val2) => {
                        if (val2 == selecionado) {
                            data[i].permissao[j] = confirmar;
                        } else {
                            data[i].permissao.push(selecionado);
                            $("#adicionarDiv").toggleClass('' + grupo_Valor + '_' + selecionado + '');
                        }
                        j++;
                    })
                }
                i++;
            });
            console.log(data);
        }
    });

    $('.tab-content').on('click', '.removerNovo', function () {
        var i = 0;
        var j = 0;
        $('#adicionarDiv').remove();
        data.map((val) => {
            if (val.grupo == grupo_Valor) {
                val.permissao.map((val2) => {
                    if (val2 == selecionado) {
                        data[i].permissao.splice([j], 1)
                    }
                    j++;
                })
            }
            i++;
        });
    });

    $('select').change(function () {
        if (valAntQue == 'teste') {
            selecionado = $(this).val();
            data.map((val) => {
                if (val.grupo == grupo_Valor) {
                    val.permissao.map((val2) => {
                        if (val2 == selecionado) {
                            $(this).prop('disabled', true);
                            alert("A função " + selecionado + " já está cadastrada nesse grupo!");
                            $('#adicionarDiv').remove();
                            $('.adicionar').removeAttr("style");
                            $('.bloquearLink').css("pointer-events", "");
                        }
                    })
                }
            })
        } else {

        }
    });
}