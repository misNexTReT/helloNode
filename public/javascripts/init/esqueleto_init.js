/**
 * @fichero             esqueleto_init.js
 * @descripcion         Init de las funcionalidades genericas
 * @autor               Daniel Soto
 *
 */


$(document).ready(function() {

    //NAV
    if(window.location.href.indexOf("users/gestion") != -1) {
        $("#navUsersGestion").addClass("active");
    }else if(window.location.href.indexOf("/rtve") != -1) {
        $("#navRTVE").addClass("active");
    }else {
        $("#navHome").addClass("active");
    }




    //BUSCADOR
	$( "#buscador" ).autocomplete({
		source: ['nodejs','jquery','javascript','npm','mongodb','bootstrap','grunt','git','sublimetext','dsg','ajax','html','express','css3','github','datatable','']
	});

});

