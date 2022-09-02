$(document).ready(function () {

    $('#cadastroDiv').on('click', '.confirmar', function () {
        let descricaos = $('#descricao').val();
        let urls = $('#url').val();

        if (descricaos === "") {
            alert("Informe uma descrição");
        } else if (urls === "") {
            alert("Informe um erl");
        } else {
            let valorDescricao = {
                descricao: descricaos,
                url: urls,
            }

            $.ajax({
                url: "http://localhost:3000/recursos",
                type: 'post',
                data: valorDescricao,
            })
                .done(function (msg) {
                    document.getElementById('descricao').value = '';
                    document.getElementById('url').value = '';
                })
                .fail(function (jqXHR, textStatus, msg) {
                    alert(msg);
                });

            $.ajax({
                url: "http://localhost:3000/recursos?descricao=",
                type: 'get',
            })
                .done(function (msg) {
                    debugger;
                    if (msg !== 0) {
                        if (msg === descricaos) {
                            alert("Essa descrição já existe");
                        };
                    };
                })
                .fail(function (jqXHR, textStatus, msg) {
                    alert(msg);
                });
        };

        descricaos = "";
        urls = "";
    });

});