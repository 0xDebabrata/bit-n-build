import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


const Map2 = ({ setSelectedArea }) => {
  const center = { lat: 19.044785, lng: 72.8203021 }
  const ZOOM_LEVEL = 6
  const [map, setMap] = useState(null)

  const regions = [
    "Bandra (West), Mumbai",
    "Chorasi, Gujarat",
    "Vadodara, Gujarat",
    "Banswara, Rajasthan",
  ]
  const positions = [
    [19.044785, 72.8203021],
    [21.024785, 72.8203021],
    [22.431785, 73.1203021],
    [23.424785, 74.8203021],
  ]

  const getNearestPosition = (event) => {
    // console.log(event.latlng)
    const { lat, lng } = event.latlng

    for (let i = 0; i < positions.length; i++) {
      const item = positions[i]
      const distance = Math.sqrt(Math.pow(item[0] - lat, 2) + Math.pow(item[1] - lng, 2));

      if (distance < 0.6) {
        setSelectedArea({
          latlng: item,
          region: regions[i]
        });
        break
      } else {
        setSelectedArea(null);
      }
    }
  };

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

    map.target.on("click", getNearestPosition)
  }, [map]);

  return (
    <MapContainer className="z-1" center={center} zoom={ZOOM_LEVEL} whenReady={setMap}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {positions.map((p, idx) => (
        <>
          <Circle center={p} pathOptions={{ fillOpacity: 1, fillColor: "red", color: "red" }} radius={12000} />
          <Circle center={p} pathOptions={{ stroke: false, fillOpacity: 0.5, fillColor: "red", color: "red" }} radius={25000} />
        </>
      ))}
      <Polyline pathOptions={{ color: 'red', opacity: 0.5 }} positions={positions} />
    </MapContainer>
  )
}

export default Map2
