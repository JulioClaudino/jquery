var grupos = [];
var UUID = '';
$(document).ready(function () {
    var html = '';
    if (window.localStorage.getItem('grupo')) {
        var html = '';
        var poderes = '';
        grupos = JSON.parse(window.localStorage.getItem('grupo'));
        var control = true;

        grupos.map((val) => {
            UUID = create_UUID();
            html += '<a style="" class="list-group-item list-group-item-action bloquearLink' + (control ? ' active' : '') + '"' +
                'id="grupos_' + UUID + '-list" data-toggle="list"' +
                'href="#list-' + UUID + '" role="tab" aria-controls="' + UUID + '">' + val.grupo + '</a>'

            if (data.poderes == poderes) {
                poderes += '<div class="tab-pane fade show' + (control ? ' active' : '') + '" id="list_' + UUID + '"' +
                    'role="tabpanel" aria-labelledby="list_' + UUID + '-list">'
                val.permissao.map((val2) => {
                    poderes += '<div class="row"><div class="col-5">' +
                        '<select id="selectId_' + UUID + '" class="form-control" disabled>' +
                        '<option value="editar" ' + (val2 === "editar" ? 'selected' : '') + '>editar</option>' +
                        '<option value="excluir" ' + (val2 === "excluir" ? 'selected' : '') + '>excluir</option>' +
                        '<option value="incluir" ' + (val2 === "incluir" ? 'selected' : '') + '>incluir</option>' +
                        '<option value="visualizar" ' + (val2 === "visualizar" ? 'selected' : '') + '>visualizar</option>' +
                        '</select></div >' +
                        '<div class="col-1 botaoum">' +
                        '<button class="btn btn-outline-primary editar" type="button data-toggle="tooltip" data-placement="top" title="Deletar opção ' + val2 + '""><i class="las la-pen" style="font-size: 25px"></i></button>' +
                        '</div>' +
                        '<div class="col-1 botaodois">' +
                        '<button class="btn btn-outline-danger remover" type="button data-toggle="tooltip" data-placement="top" title="Deletar opção ' + val2 + '""><i class="las la-trash-alt" style="font-size: 25px"></i></button>' +
                        '</div></div>';
                });
                poderes += '<div class="col-md-4 offset-md-6">' +
                    '<button class="btn btn-outline-primary adicionar" type="button data-toggle=" tooltip="" data-placement="top" title="Deletar opção visualizar"> <i class="las la-plus" style="font-size: 25px"></i></button>' +
                    '</div>'
                poderes += '</div>';
            }
            control = false;
        });
        $('#list-tab').html(html);
        $('#nav-tabContent').html(poderes);
    }
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