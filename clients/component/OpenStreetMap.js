import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, SVGOverlay, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


const Map2 = () => {
  const center = { lat: 19.044785, lng: 72.8203021 }
  const ZOOM_LEVEL = 16
  const [map, setMap] = useState(null)

  const position = [19.044785, 72.8203021]
  const bounds = [
    [position[0] + 0.0005, position[1] - 0.0004],
    [position[0] - 0.001, position[1] + 0.011]
  ]

  const locationSuccess = (geolocation) => {
    map.target.flyTo({
      lat: geolocation.coords.latitude,
      lng: geolocation.coords.longitude,
    })
  }
  const getCurrentLocation = () => {
    window.navigator.geolocation.getCurrentPosition(locationSuccess, console.error, {
      enableHighAccuracy: true
    })
  }

  useEffect(() => {
    if (!map) return;
    getCurrentLocation()
  }, [map]);


  return (
    <MapContainer center={center} zoom={ZOOM_LEVEL} whenReady={setMap}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
        <circle r="25" cx="30" cy="30" fill="red" filter="url(#blurMe)" />
        <filter id="blurMe">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </SVGOverlay>
    </MapContainer>
  )
}

export default Map2
