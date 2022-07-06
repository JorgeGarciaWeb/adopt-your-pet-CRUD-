let map

let market

function init() {
    renderMap()
    getPoundsFromDB()
    printMarkers()
    getUserLocation()
    setUserLocation()
    getRouteDetails()
    renderRoutes()


}

function renderMap() {
    map = new google.maps.Map(
        document.querySelector('#myMap'),
        { zoom: 10, center: { lat: 40.43003011279524, lng: -3.7015183281091586 }, styles: mapStyles.aubergine }
    )

}

function getPoundsFromDB() {

    axios
        .get('/api/pound')
        .then(response => printMarkers(response.data))
        .catch(err => console.log(err))
}


function printMarkers(pounds) {

    pounds.forEach(pound => {

        let position = { lat: pound.location.coordinates[0], lng: pound.location.coordinates[1] }

        new google.maps.Marker({ position, map })
    })

    map.setCenter({ lat: pounds[0].location.coordinates[0], lng: pounds[0].location.coordinates[1] })
}

function getUserLocation() {

    navigator.geolocation.getCurrentPosition(
        position => setUserLocation(position),
        error => console.error('Ha habido un problema...', error)
    )
}


function setUserLocation({ coords }) {

    const { latitude: lat, longitude: lng } = coords

    map.setCenter({ lat, lng })

    new google.maps.Marker({
        position: { lat, lng },
        map
    })

}

function getRouteDetails(info) {

    const directions = new google.maps.DirectionsService()

    const routeDetails = {
        origin: 'Ironhack Madrid',
        destination: 'Fabrik Madrid',
        travelMode: 'DRIVING'
    }

    directions.route(
        routeDetails,
        routeResults => {
            showRouteInfo(routeResults)
            renderRoutes(routeResults)
        }
    )
}

function renderRoutes(routeResults) {

    const renderer = new google.maps.DirectionsRenderer()

    renderer.setDirections(routeResults)
    renderer.setMap(map)
}