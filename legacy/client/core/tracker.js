function gps_distance(lat1, lon1, lat2, lon2)
{
	// http://www.movable-type.co.uk/scripts/latlong.html
    var R = 6371; 
    var dLat = (lat2-lat1) * (Math.PI / 180);
    var dLon = (lon2-lon1) * (Math.PI / 180);
    var lat1 = lat1 * (Math.PI / 180);
    var lat2 = lat2 * (Math.PI / 180);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    
    return d;
}

document.addEventListener("deviceready", function(){
	
	if(navigator.network.connection.type == Connection.NONE){
		$('button#home_network_button').text('No Internet Access')
		$('button#home_network_button').attr("data-icon", "delete")
		$('button#home_network_button').button('refresh');
	}
	
	else {
		$('button#home_network_button').text('Internet Access Enabled');
		$('button#home_network_button').attr("data-icon", "check");
		$('button#home_network_button').button('refresh');
	}

});


var track_id = '';      // Название маршрута
var watch_id = null;    // ID геолокации
var tracking_data = []; // Массив с данными GPS

$("#startTracking_start").live('click', function(){
  
	// Начало отслеживания пользователя
    watch_id = navigator.geolocation.watchPosition(
    
    	// Успешно
        function(position){
            tracking_data.push(position);
        },
        
        // Ошибка
        function(error){
            console.log(error);
        },
        
        // Частота обновления
        { frequency: 3000, enableHighAccuracy: true });
    
    track_id = $("#track_id").val();
    
    $("#track_id").hide();
    
    $("#startTracking_status").html("В процессе трекинг маршрута: <strong>" + track_id + "</strong>");
});


$("#startTracking_stop").live('click', function(){
	
	// Завершение трекинга
	navigator.geolocation.clearWatch(watch_id);
	
	// Сохранение позиции
	window.localStorage.setItem(track_id, JSON.stringify(tracking_data));

	// Очистка значений переменных 
	watch_id = null;
	tracking_data = [];

	$("#track_id").val("").show();
	
	$("#startTracking_status").html("Завершен трекинг маршрута: <strong>" + track_id + "</strong>");

});

$("#home_clearstorage_button").live('click', function(){
	window.localStorage.clear();
});

$("#home_seedgps_button").live('click', function(){
	window.localStorage.setItem('Образец', '[{"timestamp":13357008302000,"coords":{"heading":null,"altitude":null,"longitude":171.53488333333335,"accuracy":0,"latitude":-45.87475166666666,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700803000,"coords":{"heading":null,"altitude":null,"longitude":170.33481666666665,"accuracy":0,"latitude":-45.87465,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700804000,"coords":{"heading":null,"altitude":null,"longitude":170.33426999999998,"accuracy":0,"latitude":-45.873708333333326,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700805000,"coords":{"heading":null,"altitude":null,"longitude":170.33318333333335,"accuracy":0,"latitude":-45.87178333333333,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700806000,"coords":{"heading":null,"altitude":null,"longitude":170.33416166666666,"accuracy":0,"latitude":-45.871478333333336,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700807000,"coords":{"heading":null,"altitude":null,"longitude":170.33526833333332,"accuracy":0,"latitude":-45.873394999999995,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700808000,"coords":{"heading":null,"altitude":null,"longitude":170.33427333333336,"accuracy":0,"latitude":-45.873711666666665,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700809000,"coords":{"heading":null,"altitude":null,"longitude":170.33488333333335,"accuracy":0,"latitude":-45.87475166666666,"speed":null,"altitudeAccuracy":null}}]');

});

// Просмотр истории
$('#history').live('pageshow', function () {
	
	// Подстчет кол-ва маршрутов и показ
	tracks_recorded = window.localStorage.length;
	$("#tracks_recorded").html("<strong>" + tracks_recorded + "</strong> маршрут(ов) записано");
	
	// Очистка хранилища истории
	$("#history_tracklist").empty();
	
	// Проход по массиву маршрутов и заполнение списка
	for(i=0; i<tracks_recorded; i++){
		$("#history_tracklist").append("<li><a href='#track_info' data-ajax='false'>" + window.localStorage.key(i) + "</a></li>");
	}
	
	// Автообновление списка
	$("#history_tracklist").listview('refresh');

});

//Мой путь, показ текущей позиции и установка маркера


$('#myposition').live('pageshow', function () {
	
function success(position) {
  
  var mapcanvas = document.createElement('div');
  mapcanvas.id = 'mapcanvas';
  mapcanvas.style.height = '100%';
  mapcanvas.style.width = '100%';
    
  document.querySelector('div#posmarker').appendChild(mapcanvas);
  
  /*var image = 'img0.png';*/
  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeControl: true,
    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
  
  /*var marker = new google.maps.Marker({
      position: latlng, 
      map: map, 
      title:"Вы здесь!"
  });*/
  
/*$('#flip-min').slider('disable', function () {  
	var marker = null;
	});*/
	
	var val ='off';
	$('select#flip-min').change(function() {
	if(val!==$(this).val()){
	   
	var marker = null;
	function autoUpdate() {
	  navigator.geolocation.getCurrentPosition(function(position) {  
		var newPoint = new google.maps.LatLng(position.coords.latitude, 
											  position.coords.longitude);
											  
		
/*function getLocation()
{
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(showPosition);
    else
        console.log("Geolocation is not supported by this browser");
}
function showPosition(position)
{
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude); 
}*/

// Если маркер создан, то переместить его позицию, если не создан то создать новую
		if (marker) {
		  marker.setPosition(newPoint);
		}
		
		else {
		
		marker = new google.maps.Marker({
			position: newPoint,
			map: map,
			title:"Вы здесь!",
			/*icon: image*/
			
		  });
		}
		
		// Центрирование позиции карты
		map.setCenter(newPoint);
	  }); 

	  // Вызов autoUpdate() каждые 5 секунд
	fol = setTimeout(autoUpdate, 5000);
	}

	autoUpdate();
	
	   }
	   else {
	    val = $(this).val();
	    clearTimeout(fol);
		var marker = null;
		}
	   });
	   
	
	
    /*window.setInterval(function() {
      marker.getPosition();
    }, 3000);*/
	
}
function error(msg) {
  var s = document.querySelector('#status');
  s.innerHTML = typeof msg == 'string' ? msg : "failed";
  s.className = 'fail';
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  error('не поддерживается');
}	

	
});

/*function updateMarker(){
location.reload()
};*/


// Когда пользователь нажимает на ссылку для просмотра информации о маршруте, установить/изменить track_id атрибут  на странице track_info.
$("#history_tracklist li a").live('click', function(){

	$("#track_info").attr("track_id", $(this).text());
	
});



// Когда пользователь просматривает Track Info
$('#track_info').live('pageshow', function(){

	// Поиск track_id просматриваемого маршрута
	var key = $(this).attr("track_id");
	
	// Обновить Track Info в заголовке страницы на значение track_id
	$("#track_info div[data-role=header] h1").text(key);
	
	// Получить GPS данные конкретного маршрута
	var data = window.localStorage.getItem(key);
  
	
	// Перевести строковые GPS данные в JS объект
	data = JSON.parse(data);

	// Расчет пройденного маршрута
	total_km = 0;

	for(i = 0; i < data.length; i++){
	    
	    if(i == (data.length - 1)){
	        break;
	    }
	    
	    total_km += gps_distance(data[i].coords.latitude, data[i].coords.longitude, data[i+1].coords.latitude, data[i+1].coords.longitude);
	}
	
	total_km_rounded = total_km.toFixed(2);	
	// Расчет пройденнного расстояния, времени и скорости
	start_time = new Date(data[0].timestamp).getTime();
	end_time = new Date(data[data.length-1].timestamp).getTime();

	total_time_ms = end_time - start_time;
	total_time_s = total_time_ms / 1000;
	
	final_time_m = Math.floor(total_time_s / 60);
	final_time_s = total_time_s - (final_time_m * 60);// !!!!!!!!!!!!!!!!
	final_time_s_rounded = final_time_s.toFixed(0);// !!!!!!!!!!!!!!!!

	aver_speed_km_h = total_km_rounded / ((final_time_m / 60) + (final_time_s / 3600))
	aver_speed_km_h_rounded = aver_speed_km_h.toFixed(2);
	
	/*trackCoords_str = trackCoords.toString(0);
	final_time_m_str = final_time_m.toString(0);
	final_time_s_rounded_str = final_time_s_rounded.toString(0);
	aver_speed_km_h_rounded_str = aver_speed_km_h_rounded.toString(0);
	total_km_rounded_str = total_km_rounded.toString(0);*/
	
	$("#track_info_info").html('Пройдено <strong>' + total_km_rounded + ' км</strong> за <strong>' + final_time_m + ' мин</strong> и <strong>' + final_time_s_rounded + ' сек</strong> </br>Средняя скорость <strong>' + aver_speed_km_h_rounded + ' км/ч</strong>');
	
	//Определение даты
	function formatDate(date) {
	  var dd = date.getDate()
	  if ( dd < 10 ) dd = '0' + dd;
	  var mm = date.getMonth()+1
	  if ( mm < 10 ) mm = '0' + mm;
	  var yy = date.getFullYear() % 100;
	  if ( yy < 10 ) yy = '0' + yy;
	  return yy+'.'+mm+'.'+dd; 
	}

	var date_cur_raw = new Date();
	var date_cur_raw_again = formatDate(date_cur_raw); 
	var date_cur = date_cur_raw_again;
	//
	var myLatLng = new google.maps.LatLng(data[0].coords.latitude, data[0].coords.longitude);
	
	var myOptions = {
      zoom: 15,
      center: myLatLng,
      mapTypeControl: true,
      navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	

    
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var trackCoords = [];
    
    
    for(i=0; i<data.length; i++){
    	trackCoords.push(new google.maps.LatLng(data[i].coords.latitude, data[i].coords.longitude));
    }
    
     
	  var trackPath = new google.maps.Polyline({
      path: trackCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
		    // Прочертить линию маршрута на карте
    trackPath.setMap(map);	
	
	$("#sendRoute").live('click', function () {
		/*trackCoords_str = JSON.stringify(trackCoords);
		final_time_m_str = JSON.stringify(final_time_m);
		final_time_s_rounded_str = JSON.stringify(final_time_s_rounded);
		aver_speed_km_h_rounded_str = JSON.stringify(aver_speed_km_h_rounded);		
		total_km_rounded_str = JSON.stringify(total_km_rounded);*/
		
		$.ajax({
			url: "http://your_url",
			type: "POST",
			dataType: "json",
			data: {
				trackID: key,
				timeInMinutes: final_time_m,
				timeInSeconds: final_time_s_rounded,
				averageSpeed: aver_speed_km_h_rounded,
				distance: total_km_rounded,
				dateC: date_cur
			},
			/*success: function(data, textStatus, jqXHR){alert(data, textStatus, jqXHR);}, */
			success: function(data){
				console.log(data);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.responseText);
				alert(thrownError);
			}
			
			
		});
	});
});
