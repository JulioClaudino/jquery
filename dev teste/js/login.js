$(document).ready(function () {
    $('#Confirmar').click(function () {
        let email = $('#exampleInputEmail1').val();
        let password = $('#exampleInputPassword1').val();

        $(this).html('Processando...');

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

        if (window.localStorage.getItem('usuario')) {
            cadastro = JSON.parse(window.localStorage.getItem('usuario'));

            cadastro.map((val) => {
                if (val.email == email) {
                    if (val.password == password) {
                        window.location = 'home.html';
                    } else {
                        $('#Nome-Do-Login').html('<div class="alert alert-danger" role="alert">Senha incorreto</div>');
                        $(this).html('Confirmar');
                    }
                } else {
                    $('#Nome-Do-Login').html('<div class="alert alert-danger" role="alert">Email incorreto</div>');
                    $(this).html('Confirmar');
                }
            });
        };
    });

    function validicao(email, password) {
        let emailFilter = /^.+@.+\..{2,}$/;
        let illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/

        if (email == '') {
            mensagem = $('#Nome-Do-Login').html('<div class="alert alert-danger" role="alert">Favor informar um email</div>');
            return false;
        }

        if (!(emailFilter.test(email)) || email.match(illegalChars)) {
            $('#Nome-Do-Login').show().removeClass("ok").addClass("erro")
                .text('Por favor, informe um email valido.');
            return false;
        }

        if (password == '') {
            mensagem = $('#Nome-Do-Login').html('<div class="alert alert-danger" role="alert">Deve ser informado uma senha</div>');
            return false;
        }

        if (password.length <= 6) {
            mensagem = $('#Nome-Do-Login').html('<div class="alert alert-danger" role="alert">A senha tem que ter 7 caracteres</div>');
            return false;
        }
        else {
            mensagem = $('#Nome-Do-Login').html('');
        }
        return true;
    }
});