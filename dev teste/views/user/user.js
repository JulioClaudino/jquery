$(document).ready(function () {
    let cadastro = [];
    let usuario = "";
    let email = "";
    let password = "";
    if (window.localStorage.getItem('usuario')) {
        cadastro = JSON.parse(window.localStorage.getItem('usuario'));
    };

    $('#cadastroDiv').on('click', '.confirmar', function () {
        usuario = $('#nome').val();
        email = $('#exampleInputEmail').val();
        password = $('#exampleInputPassword').val();
        
        $.ajax({
            url: "http://localhost:3000/users",
            type: 'post',
            data: {
                nome: usuario,
                email: email,
                password: password
            },
            beforeSend: function () {
                alert("Cadastro feito com sucesso.");
            }
        })
            .done(function (msg) {
                document.getElementById('nome').value = '';
                document.getElementById('exampleInputEmail').value = '';
                document.getElementById('exampleInputPassword').value = '';
            })
            .fail(function (jqXHR, textStatus, msg) {
                alert(msg);
            });

        if (!validicao(usuario, email, password)) {
            return false;
        };

        usuario = $("#nome").val();
        email = $("#exampleInputEmail").val();
        password = $("#exampleInputPassword").val();
        cadastro.push({ "usuario": usuario, "email": email, "password": password });
        window.localStorage.setItem('usuario', JSON.stringify(cadastro));
    });

    function validicao(usuario, email, password) {
        var emailFilter = /^.+@.+\..{2,}$/;
        var illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/

        if (usuario == '') {
            alert('Favor informar um usuario.');
            return false;
        }

        if (email == '') {
            alert('Favor informar um email.');
            return false;
        }

        if (!(emailFilter.test(email)) || email.match(illegalChars)) {
            alert('Por favor, informe um email valido.');
            return false;
        }

        if (password == '') {
            alert('Deve ser informado uma senha.');
            return false;
        }

        if (password.length <= 6) {
            alert('A senha tem que ter 7 caracteres.');
            return false;
        };

        let usuariosCad = cadastro.find((val) => {
            if (val.usuario == usuario) {
                return val;
            };
        });

        if (usuariosCad !== undefined) {
            alert('Esse usuario j?? existe.');
            return false;
        };

        let emailCad = cadastro.find((val) => {
            if (val.email == email) {
                return val;
            };
        });

        if (emailCad !== undefined) {
            alert('Esse email j?? existe.');
            return false;
        };
        return true;
    };
});