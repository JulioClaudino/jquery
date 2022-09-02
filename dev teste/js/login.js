$(document).ready(function () {

    $('#Confirmar').click(function () {
        let email = $('#exampleInputEmail1').val();
        let password = $('#exampleInputPassword1').val();

        if (!validicao(email, password)) {
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
            url: "http://localhost:3000/users?email=" + email,
            type: 'get',
            beforeSend: function () {
                $(this).html('Processando...');
            }
        })
            .done(function (msg) {
                console.log(msg[0]);
                debugger;
                if (msg.length !== 0) {
                    if (msg[0].password === password) {
                        window.location = 'home.html';
                    } else {
                        $('#Nome-Do-Login').html('<div class="alert alert-danger" role="alert">Senha incorreto</div>');
                        $(this).html('Confirmar');
                    };
                } else {
                    $('#Nome-Do-Login').html('<div class="alert alert-danger" role="alert">Email incorreto</div>');
                }
            })
            .fail(function (jqXHR, textStatus, msg) {
                alert(msg);
            });
    });

    function validicao(email, password) {
        let emailFilter = /^.+@.+\..{2,}$/;
        let illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/

        if (email == '') {
            $('#Nome-Do-Login').html('<div class="alert alert-danger" role="alert">Favor informar um email</div>');

            return false;
        }

        if (!(emailFilter.test(email)) || email.match(illegalChars)) {
            $('#Nome-Do-Login').html('<div class="alert alert-danger" role="alert">Por favor, informe um email valido</div>');
            return false;
        }

        if (password == '') {
            $('#Nome-Do-Login').html('<div class="alert alert-danger" role="alert">Deve ser informado uma senha</div>');
            return false;
        }

        if (password.length <= 6) {
            $('#Nome-Do-Login').html('<div class="alert alert-danger" role="alert">A senha tem que ter 7 caracteres</div>');
            return false;
        }
        else {
            $('#Nome-Do-Login').html('');
        }
        return true;
    }
});