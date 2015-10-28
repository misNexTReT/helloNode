/**
 * @fichero             usuario_init.js
 * @descripcion         Init de las funcionalidades para los usuarios
 * @autor               Daniel Soto
 *
 */


$(document).ready(function() {

    //Cosas que hacer cuando hay un user conectado
    if($.cookie('nameUserCookie') != undefined) {

        //Ponemos el nombre del usuario en la barra
        $("#navUserName").text($.cookie("nameUserCookie"));

        //Ocultamos todos los elementos unicos para admin si no lo es
        if($.cookie('nameUserCookie') != 'admin') {
            $('.admin').hide();
        }
    }

    //Registrar un usuario
    HN.usuario.registrar();

    //Login de un usuario
    HN.usuario.login();

    //Logout de un usuario
    HN.usuario.logout();

    //Borrar un usuario
    HN.usuario.dialogBorrarusuario();

    //Paginar tabla de usuarios
    if(window.location.href.indexOf("users/gestion") != -1) {
        $('#listaUsuarios').DataTable();
    }

});

$(window).load(function(){

    
});