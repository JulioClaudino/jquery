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
                    }
                }
            });
        };
    });

    function validicao(email, password) {
        let emailFilter = /^.+@.+\..{2,}$/;
        let illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/

        if (email == '') {
            mensagem = $('#Nome-Do-Login').html('Favor informar um email');
            return false;
        }

        if (!(emailFilter.test(email)) || email.match(illegalChars)) {
            $('#Nome-Do-Login').show().removeClass("ok").addClass("erro")
                .text('Por favor, informe um email valido.');
            return false;
        }

        if (password == '') {
            mensagem = $('#Nome-Do-Login').html('Deve ser informado uma senha');
            return false;
        }

        if (password.length <= 6) {
            mensagem = $('#Nome-Do-Login').html('A senha tem que ter 7 caracteres');
            return false;
        }
        else {
            mensagem = $('#Nome-Do-Login').html('');
        }
        return true;
    }
});