var funciones = {
///////////////// ******** ---- 		cargar_marcadores				------ ************ //////////////////
//////// Carga los marcadores al mapa
	// Como parametros recibe:
	
	cargar_marcadores : function($objeto) {
		var geocoder = new google.maps.Geocoder();
		var map = new google.maps.Map(document.getElementById('map'), {
			center : {
				lat : 20.6739383,
				lng : -103.4054539
			},
			scrollwheel : false,
			zoom : 12
		});
		
		var position = {
			lat : 20.683976,
			lng : -103.343795
		};

		var marker = new google.maps.Marker({
			position : position,
			title : "Hello World!"
		});
		
		var propiedades = [];
		
		$.getJSON("app/src/propiedades.json", function(datos) {
			console.log("=====> direcciones");
			console.log(datos);

			$.each(datos, function(index, val) {
				var direccion = val['calle'] + ' ' + val['numero_exterior'] + ', ' + val['colonia'] + ', ' + val['municipio'];
				val['direccion'] = direccion;
				
				geocoder.geocode({
					'address' : direccion
				}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						map.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
							map : map,
							position : results[0].geometry.location
						});
						
						var datos = [];
						datos['marcador'] = marker;
						datos['val'] = val;
						datos['map'] = map;
						
						marker.addListener('click', function() {
							funciones.mostrar_informacion(datos);
						}); 
					} else {
						console.log('Error al colocar marcador: ' + status);
					}
				});
			});
		});
	},

///////////////// ******** ---- 		FIN cargar_marcadores			------ ************ //////////////////

///////////////// ******** ---- 		mostrar_informacion				------ ************ //////////////////
//////// Muestra una ventana con la informacion de la propiedad
	// Como parametros puede recibir:
		// map -> Mapa donde se carga la ventana
		// marcador -> Marcador sobre el que se muestra la informacion
		// val -> Array con los datos de la propiedad

	mostrar_informacion : function($objeto) {
		console.log('--------> objeto mostrar_informacion');
		console.log($objeto);
		
		 var contentString = 
		 	'<div id="content">'+
	      		'<div id="siteNotice">'+
	      		'</div>'+
	      		'<h1 id="firstHeading" class="firstHeading">'+$objeto['val']['id']+'</h1>'+
	     		'<div id="bodyContent" class="row">'+
		     		'<div class="col-md-6">'+
		      			'<p>Ubicada en <b>'+
		      				$objeto['val']['direccion']+'</b>, '+$objeto['val']['descripcion']+
		      				'<br>Estacionamientos: <b>'+$objeto['val']['estacionamientos']+
		      				'</b><br>Habitaciones: <b>'+$objeto['val']['habitaciones']+
		      				'</b><br>precio $: <b>'+$objeto['val']['precio']+
		      				'</b>'+
		      			'</p>'+
		      		'</div>'+
		     		'<div class="col-md-6">'+
		      			'<a href="'+$objeto['val']['url']+'">'+
		      				'<img style="max-width: 300px;" class="img-responsive" src="'+$objeto['val']['imagen']+'"/>'+
		      			'</a>'+
		      		'</div>'+
	      		'</div>'+
	      	'</div>';
      
		var infowindow = new google.maps.InfoWindow({
			content : contentString
		}); 
		
		infowindow.open($objeto['map'], $objeto['marcador']);
	},
	
///////////////// ******** ---- 		FIN mostrar_informacion			------ ************ //////////////////

}; // Fin clase funciones