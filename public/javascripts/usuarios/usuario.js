/**
 * @fichero             usuario.js
 * @descripcion         Lógica de las funcionalidades para los usuario
 * @autor               Daniel Soto
 *
 */

if (typeof window.HN==="undefined"){
    window.HN = {};
}
if (!HN.usuario){
    HN.usuario={};
}

HN.usuario=$.extend(HN.usuario,{
    HN_USUARIO: "HN_USUARIO",

    /**************************************
     ******* Registro de un usuario *******
     **************************************/
    registrar: function(){

        //Ir a la pagina de registro
        $('#registrar').on('click', function(e){
            e.preventDefault();
            window.location.href = "/users/registro";
        });


        //Evento del boton de Aceptar Registro
        $('#aceptarRegistro').on('click', function (event) {
            event.preventDefault();

            // Super basic validation - increase errorCount variable if any fields are blank
            var errorCount = 0;
            $('#userRegistro input').each(function(index, val) {
                if($(this).val() === '') { errorCount++; }
            });

            // Check and make sure errorCount's still at zero
            if(errorCount === 0) {

                // If it is, compile all user info into one object
                var newUser = {
                    'username': $('#userRegistro fieldset input#username').val(),
                    'email': $('#userRegistro fieldset input#email').val(),
                    'password': $('#userRegistro fieldset input#password').val()
                }

                // Use AJAX to post the object to our adduser service
                $.ajax({
                    type: 'POST',
                    data: newUser,
                    url: '/users/crearUsuario',
                    dataType: 'JSON'
                }).done(function( response ) {

                    // Check for successful (blank) response
                    if (response.msg === '') {

                        // Clear the form inputs
                        $('#userRegistro fieldset input').val('');

                        //Vamos a la pagina de inicio logado
                         window.location.href = "/";

                    }
                    else {

                        // If something goes wrong, alert the error message that our service returned
                        alert('Error: ' + response.msg);

                    }
                });
            }
            else {
                // If errorCount is more than 0, error out
                $('#errorRegistro').removeClass("hide");
                return false;
            }
        });

        //Evento del boton de Aceptar Registro
        $('#cancelarRegistro').on('click', function (event) {
            event.preventDefault();
            window.location.href = "/";
        });

    },


    /***********************************
     ******* Login de un usuario *******
     ***********************************/
    login: function(){

        //Login con ENTER
        $('#userLogin input').keypress(function(e) {
            var code = e.keyCode || e.which;
            if(code == 13) { $('#login').click(); }
        });

        //Evento de login
        $('#login').on('click', function(){

            var usuario = {
                'username': $('#username').val(),
                'password': $('#password').val(),
            }


            $.ajax({
                url: '/users/loginUsuario',
                type: 'POST',
                dataType: 'JSON',
                data: usuario,
            })
            .done(function() {
                console.log("success");
                window.location.href = "/index";
            })
            .fail(function() {
                console.log("error");
                //Limpiamos el formulario
                $('#userLogin fieldset input[class=form-control]').val('')
                $('#errorRegistro').removeClass("hide");
            })
            .always(function() {
                console.log("complete");
            });

        });
    },


    /***********************************
     ******* Logout de un usuario *******
     ***********************************/
    logout: function(){
        //Deslogarse
        $('#logout').on('click', function(e){
            e.preventDefault();
            $.removeCookie("idUserCookie", { path: '/' });
            $.removeCookie("nameUserCookie", { path: '/' });
            window.location.href = "/index";
        });
    },


    /***********************************
     ******* Delete de un usuario *******
     ***********************************/
    borrarUsuario: function(tr, dialogItself){

        var usuario = {
            'id': $(tr).find("#userid").text(),
            'username': $(tr).find("#username").text(),
            'email': $(tr).find("#email").text()
        }

        $.ajax({
            url: '/users/borrarUsuario',
            type: 'POST',
            dataType: 'JSON',
            data: usuario
        })
        .done(function() {
            setTimeout(function(){
                tr.remove();
                dialogItself.close();
            }, 1000); 
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

    },


    /*************************************************************
     ******* Ventana de confirmacion de borrado de usuario *******
     *************************************************************/
    dialogBorrarusuario: function(){

        $(document).on('click', '#borrarUsuario', function(e){

            var tr = $(this).closest("tr");
            var username = $(tr).find('#username').text();

            BootstrapDialog.show({
                title: 'Borrar Usuario',
                type: 'type-danger',
                message: 'Desea borrar el usuario: ' + username + '',
                closable: false,
                buttons: [
                {
                    label: 'Borrar',
                    cssClass: 'btn-danger',
                    icon: 'glyphicon glyphicon-remove',
                    autospin: true,
                    action: function(dialogItself){
                        HN.usuario.borrarUsuario(tr, dialogItself);
                    }
                }, 
                {
                    label: 'Cancelar',
                    autospin: true,
                    action: function(dialogItself){
                        dialogItself.close();
                    }
                }]
            });

        });

    },

    /****************************************
     ******* Registro masivo de users *******
     ****************************************/
    registroMasivoJoker: function(){
        for(var i=0;i<100;i++){

            // If it is, compile all user info into one object
            var newUser = {
                'username': 'joker',
                'email': 'joker@joker.jok',
                'password': 'joker'
            }

            // Use AJAX to post the object to our adduser service
            $.ajax({
                type: 'POST',
                data: newUser,
                url: '/users/crearUsuario',
                dataType: 'JSON'
            }).done(function( response ) {
                console.log("joker guardado");
            });
        }
    },

    /***********************************
     ******* Delete de un usuario *******
     ***********************************/
    pruebaRender: function(){

        $.ajax({
            url: '/users/pruebaRender',
            type: 'POST'
        })
        .done(function(data) {
            console.log("donde: " + data);
            html = $.parseHTML(data),
            $("#pruebaRender").empty();
            $("#pruebaRender").append(html);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

    },



});

