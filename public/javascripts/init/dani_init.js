/**
 * @fichero             esqueleto_init.js
 * @descripcion         Init de las funcionalidades genericas
 * @autor               Daniel Soto
 *
 */


$(document).ready(function() {

	$('#aceptar').on('click', function(){


            // Use AJAX to post the object to our adduser service
            $.ajax({
                type: 'GET',
                url: '/daniAjax'
            }).done(function(data) {
	            alert(data + " ajax");
	        }).fail(function() {
	            alert("error ajax");
	        }).always(function() {
	            alert("complete ajax");
	        });


	});

});