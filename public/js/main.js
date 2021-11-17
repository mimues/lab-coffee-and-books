function initMap() {

    const ironhackMAD = {
      lat: 40.39279917456607,
      lng: -3.698590505452073
    };
  
  
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: ironhackMAD
    });
  
    getPlaces(map)
      .then(places => {
        // 7. Instrucciones: Llamar a locate pasandoles la info
        let markers = locatePlaces(map, places)
      })
      .catch(err => console.log(err))
}

function getPlaces() {
    return axios.get("/api/places")
        .then(response => response.data.places)
}

function locatePlaces(map, places) {
    let markers = []
  
    // 8. Instrucciones: Por cada restaurante creo un nuevo Marker
    places.forEach((place) => {
      const center = {
        lat: place.location.coordinates[0],
        lng: place.location.coordinates[1]
      };
      const newMarker = new google.maps.Marker({
        position: center,
        map: map,
        title: place.name
      });

      markers.push(newMarker);
    });

    // 9. Instrucciones: Finalmente retorno los markers por si los necesitase a futuro
    return markers
}