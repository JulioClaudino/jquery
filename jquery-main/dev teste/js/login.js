$('#Confirmar').click(function () {
    var email = $('#exampleInputEmail1').val();
    var senha = $('#exampleInputPassword1').val();

    $(this).html('Processando...');

    if (!validicao(email, senha)) {
        $(this).html('Confirmar');
        return false;
    }

    if ($("input[type=checkbox]").is(
        ":checked")) {
        console.log("Marcado");
    } else {
        console.log("Desmarcado");
    }

    $.ajax({
        url: "http://10.1.91.92:4100/login",
        type: 'post',
        data: {
            "email": email,
            "password": senha
        },
        beforeSend: function () {
            $(this).text("ENVIANDO...");
        }
    })
        .done(function (msg) {
            console.log(msg);
            if (msg == "Autenticado") {
                mensagem = window.location = 'home.html';
            }
            else {
                mensagem = $('#Nome-Do-Login').html(msg);
            }
        })
        .fail(function (jqXHR, textStatus, msg) {
            mensagem = $('#Confirmar').html('Confirmar');
            alert(msg)
        });

    if (confirmar == 'Erro ao conectar') {
        $(this).html('Confirmar');
    }
});

function validicao(email, senha) {
    var emailFilter = /^.+@.+\..{2,}$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/

    if (email == '') {
        mensagem = $('#Nome-Do-Login').html('Favor informar um email');
        return false;
    }

    if (!(emailFilter.test(email)) || email.match(illegalChars)) {
        $('#Nome-Do-Login').show().removeClass("ok").addClass("erro")
            .text('Por favor, informe um email valido.');
        return false;
    }

    if (senha == '') {
        mensagem = $('#Nome-Do-Login').html('Deve ser informado uma senha');
        return false;
    }

    if (senha.length <= 6) {
        mensagem = $('#Nome-Do-Login').html('A senha tem que ter 7 caracteres');
        return false;
    }
    else {
        mensagem = $('#Nome-Do-Login').html('');
    }
    return true;
}