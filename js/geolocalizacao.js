function initMap() {
	const loadingEl = document.getElementById('loading');

	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(
		function (position) {
		  const lat = position.coords.latitude;
		  const lng = position.coords.longitude;
		  const accuracy = position.coords.accuracy;

		  const userLocation = { lat, lng };

		  const map = new google.maps.Map(document.getElementById("map"), {
			zoom: 17,
			center: userLocation,
		  });

		  new google.maps.Marker({
			position: userLocation,
			map: map,
			title: "Você está aqui",
		  });

		  $('.endereco').html(`
			Latitude: ${lat.toFixed(6)}<br>
			Longitude: ${lng.toFixed(6)}<br>
			<small>Precisão estimada: ${accuracy.toFixed(2)} metros</small>
		  `);

		  if (loadingEl) loadingEl.style.display = 'none';
		},
		function (error) {
		  $('.endereco').text('Não foi possível obter sua localização.');
		  if (loadingEl) loadingEl.style.display = 'none';
		  console.error("Erro ao obter localização:", error);
		},
		{
		  enableHighAccuracy: true,
		  timeout: 10000,
		  maximumAge: 0
		}
	  );
	} else {
	  $('.endereco').text('Geolocalização não é suportada pelo seu navegador.');
	  if (loadingEl) loadingEl.style.display = 'none';
	}
  }



